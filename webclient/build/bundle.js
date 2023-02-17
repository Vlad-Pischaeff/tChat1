
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    let src_url_equal_anchor;
    function src_url_equal(element_src, url) {
        if (!src_url_equal_anchor) {
            src_url_equal_anchor = document.createElement('a');
        }
        src_url_equal_anchor.href = url;
        return element_src === src_url_equal_anchor.href;
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_input_value(input, value) {
        input.value = value == null ? '' : value;
    }
    function custom_event(type, detail, bubbles = false) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    // flush() calls callbacks in this order:
    // 1. All beforeUpdate callbacks, in order: parents before children
    // 2. All bind:this callbacks, in reverse order: children before parents.
    // 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
    //    for afterUpdates called during the initial onMount, which are called in
    //    reverse order: children before parents.
    // Since callbacks might update component values, which could trigger another
    // call to flush(), the following steps guard against this:
    // 1. During beforeUpdate, any updated components will be added to the
    //    dirty_components array and will cause a reentrant call to flush(). Because
    //    the flush index is kept outside the function, the reentrant call will pick
    //    up where the earlier call left off and go through all dirty components. The
    //    current_component value is saved and restored so that the reentrant call will
    //    not interfere with the "parent" flush() call.
    // 2. bind:this callbacks cannot trigger new flush() calls.
    // 3. During afterUpdate, any updated components will NOT have their afterUpdate
    //    callback called a second time; the seen_callbacks set, outside the flush()
    //    function, guarantees this behavior.
    const seen_callbacks = new Set();
    let flushidx = 0; // Do *not* move this inside the flush() function
    function flush() {
        const saved_component = current_component;
        do {
            // first, call beforeUpdate functions
            // and update components
            while (flushidx < dirty_components.length) {
                const component = dirty_components[flushidx];
                flushidx++;
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            flushidx = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        seen_callbacks.clear();
        set_current_component(saved_component);
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);
    function outro_and_destroy_block(block, lookup) {
        transition_out(block, 1, 1, () => {
            lookup.delete(block.key);
        });
    }
    function update_keyed_each(old_blocks, dirty, get_key, dynamic, ctx, list, lookup, node, destroy, create_each_block, next, get_context) {
        let o = old_blocks.length;
        let n = list.length;
        let i = o;
        const old_indexes = {};
        while (i--)
            old_indexes[old_blocks[i].key] = i;
        const new_blocks = [];
        const new_lookup = new Map();
        const deltas = new Map();
        i = n;
        while (i--) {
            const child_ctx = get_context(ctx, list, i);
            const key = get_key(child_ctx);
            let block = lookup.get(key);
            if (!block) {
                block = create_each_block(key, child_ctx);
                block.c();
            }
            else if (dynamic) {
                block.p(child_ctx, dirty);
            }
            new_lookup.set(key, new_blocks[i] = block);
            if (key in old_indexes)
                deltas.set(key, Math.abs(i - old_indexes[key]));
        }
        const will_move = new Set();
        const did_move = new Set();
        function insert(block) {
            transition_in(block, 1);
            block.m(node, next);
            lookup.set(block.key, block);
            next = block.first;
            n--;
        }
        while (o && n) {
            const new_block = new_blocks[n - 1];
            const old_block = old_blocks[o - 1];
            const new_key = new_block.key;
            const old_key = old_block.key;
            if (new_block === old_block) {
                // do nothing
                next = new_block.first;
                o--;
                n--;
            }
            else if (!new_lookup.has(old_key)) {
                // remove old block
                destroy(old_block, lookup);
                o--;
            }
            else if (!lookup.has(new_key) || will_move.has(new_key)) {
                insert(new_block);
            }
            else if (did_move.has(old_key)) {
                o--;
            }
            else if (deltas.get(new_key) > deltas.get(old_key)) {
                did_move.add(new_key);
                insert(new_block);
            }
            else {
                will_move.add(old_key);
                o--;
            }
        }
        while (o--) {
            const old_block = old_blocks[o];
            if (!new_lookup.has(old_block.key))
                destroy(old_block, lookup);
        }
        while (n)
            insert(new_blocks[n - 1]);
        return new_blocks;
    }
    function validate_each_keys(ctx, list, get_context, get_key) {
        const keys = new Set();
        for (let i = 0; i < list.length; i++) {
            const key = get_key(get_context(ctx, list, i));
            if (keys.has(key)) {
                throw new Error('Cannot have duplicate keys in a keyed each');
            }
            keys.add(key);
        }
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.45.0' }, detail), true));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    const iconOK = "data:image/png;base64,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";
    const iconAvatar = 'data:image/png;base64,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';
    const iconMail = "data:image/png;base64,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";

    function random_id() {
      return (
        Number(String(Math.random()).slice(2)) + 
        Date.now() + 
        Math.round(performance.now())
      ).toString(36);
    }

    function isEmpty(obj) {
      for (let key in obj) {
        // если тело цикла начнет выполняться - значит в объекте есть свойства
        return false;
      }
      return true;
    }

    const {	API_HOST_DEV,	API_PORT_DEV,	API_HOST,	API_PORT, isProd } = {"env":{"isProd":false,"API_HOST_DEV":"localhost","API_PORT_DEV":"5001","API_PREFIX_DEV":"http","API_HOST":"tchat.granadapress.ru","API_PORT":"5001","API_PREFIX":"https"}}['env'];
    let WS_URL, URL;

    if (isProd) {
      URL = `https://${API_HOST}:${API_PORT}`;
      WS_URL = `wss://${API_HOST}:${API_PORT}/ws`;
    } else {
      URL = `http://${API_HOST_DEV}:${API_PORT_DEV}`;
      WS_URL = `ws://${API_HOST_DEV}:${API_PORT_DEV}/ws`;
    }

    let url = (window.location != window.parent.location)
      ? document.referrer         									// ... https://tele.scope.cf
      : document.location.href;   									// ... https://tchat.scope.cf:5001/client
    let HOST = url.split(':')[1].split('/')[2];

    function MessageObj(msg, from) {
      this.from = from;
      this.msg = msg;
      this.date = Date.now();
    }

    function swMessageObj(type, msg, userId) {
      this.type = type;
      this.msg = msg;
      this.userId = userId;
    }

    /* src\Header.svelte generated by Svelte v3.45.0 */
    const file$3 = "src\\Header.svelte";

    function create_fragment$3(ctx) {
    	let section0;
    	let a;
    	let t1;
    	let section1;
    	let picture;
    	let img0;
    	let img0_src_value;
    	let t2;
    	let div0;
    	let div0_class_value;
    	let t3;
    	let div3;
    	let div1;
    	let t4_value = /*Session*/ ctx[0]?.userTitle + "";
    	let t4;
    	let t5;
    	let div2;
    	let t6_value = /*Session*/ ctx[0]?.userDesc + "";
    	let t6;
    	let t7;
    	let img1;
    	let img1_src_value;

    	const block = {
    		c: function create() {
    			section0 = element("section");
    			a = element("a");
    			a.textContent = "trivial chat ©";
    			t1 = space();
    			section1 = element("section");
    			picture = element("picture");
    			img0 = element("img");
    			t2 = space();
    			div0 = element("div");
    			t3 = space();
    			div3 = element("div");
    			div1 = element("div");
    			t4 = text(t4_value);
    			t5 = space();
    			div2 = element("div");
    			t6 = text(t6_value);
    			t7 = space();
    			img1 = element("img");
    			attr_dev(a, "href", "https://tchat.scope.cf");
    			attr_dev(a, "target", "_blank");
    			attr_dev(a, "rel", "noopener noreferrer");
    			add_location(a, file$3, 6, 2, 114);
    			attr_dev(section0, "class", "cp_logo");
    			add_location(section0, file$3, 5, 0, 85);
    			attr_dev(img0, "class", "cp_header-avatarimg");
    			if (!src_url_equal(img0.src, img0_src_value = /*Session*/ ctx[0]?.userAvatar)) attr_dev(img0, "src", img0_src_value);
    			attr_dev(img0, "alt", "avatar");
    			add_location(img0, file$3, 10, 4, 297);

    			attr_dev(div0, "class", div0_class_value = (/*Session*/ ctx[0]?.online)
    			? "online_status"
    			: "online_status-off");

    			add_location(div0, file$3, 11, 4, 375);
    			attr_dev(picture, "class", "cp_header-avatar");
    			add_location(picture, file$3, 9, 2, 257);
    			attr_dev(div1, "class", "cp_header-card-1");
    			add_location(div1, file$3, 14, 4, 502);
    			attr_dev(div2, "class", "cp_header-card-2");
    			add_location(div2, file$3, 15, 4, 564);
    			attr_dev(div3, "class", "cp_header-card");
    			add_location(div3, file$3, 13, 2, 468);
    			attr_dev(img1, "class", "w-icon svelte-14m4cx4");
    			if (!src_url_equal(img1.src, img1_src_value = iconMail)) attr_dev(img1, "src", img1_src_value);
    			attr_dev(img1, "alt", "mail");
    			attr_dev(img1, "title", "temporarily unavailable");
    			add_location(img1, file$3, 17, 2, 633);
    			attr_dev(section1, "class", "cp_header");
    			add_location(section1, file$3, 8, 0, 226);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section0, anchor);
    			append_dev(section0, a);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, section1, anchor);
    			append_dev(section1, picture);
    			append_dev(picture, img0);
    			append_dev(picture, t2);
    			append_dev(picture, div0);
    			append_dev(section1, t3);
    			append_dev(section1, div3);
    			append_dev(div3, div1);
    			append_dev(div1, t4);
    			append_dev(div3, t5);
    			append_dev(div3, div2);
    			append_dev(div2, t6);
    			append_dev(section1, t7);
    			append_dev(section1, img1);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*Session*/ 1 && !src_url_equal(img0.src, img0_src_value = /*Session*/ ctx[0]?.userAvatar)) {
    				attr_dev(img0, "src", img0_src_value);
    			}

    			if (dirty & /*Session*/ 1 && div0_class_value !== (div0_class_value = (/*Session*/ ctx[0]?.online)
    			? "online_status"
    			: "online_status-off")) {
    				attr_dev(div0, "class", div0_class_value);
    			}

    			if (dirty & /*Session*/ 1 && t4_value !== (t4_value = /*Session*/ ctx[0]?.userTitle + "")) set_data_dev(t4, t4_value);
    			if (dirty & /*Session*/ 1 && t6_value !== (t6_value = /*Session*/ ctx[0]?.userDesc + "")) set_data_dev(t6, t6_value);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section0);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(section1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Header', slots, []);
    	let { Session } = $$props;
    	const writable_props = ['Session'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Header> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('Session' in $$props) $$invalidate(0, Session = $$props.Session);
    	};

    	$$self.$capture_state = () => ({ iconMail, Session });

    	$$self.$inject_state = $$props => {
    		if ('Session' in $$props) $$invalidate(0, Session = $$props.Session);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [Session];
    }

    class Header extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, { Session: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Header",
    			options,
    			id: create_fragment$3.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*Session*/ ctx[0] === undefined && !('Session' in props)) {
    			console.warn("<Header> was created without expected prop 'Session'");
    		}
    	}

    	get Session() {
    		throw new Error("<Header>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set Session(value) {
    		throw new Error("<Header>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\Message.svelte generated by Svelte v3.45.0 */

    const file$2 = "src\\Message.svelte";

    function create_fragment$2(ctx) {
    	let div1;
    	let div0;
    	let p0;
    	let t0_value = new Date(/*message*/ ctx[0].date).toLocaleString() + "";
    	let t0;
    	let t1;
    	let p1;
    	let t2_value = /*message*/ ctx[0].msg + "";
    	let t2;
    	let div0_class_value;
    	let div1_data_align_value;

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			p0 = element("p");
    			t0 = text(t0_value);
    			t1 = space();
    			p1 = element("p");
    			t2 = text(t2_value);
    			attr_dev(p0, "class", "msg-data");
    			add_location(p0, file$2, 14, 4, 429);
    			attr_dev(p1, "class", "msg-text");
    			add_location(p1, file$2, 15, 4, 501);

    			attr_dev(div0, "class", div0_class_value = /*message*/ ctx[0].from
    			? 'chat_field-messagefrom'
    			: 'chat_field-messageto');

    			add_location(div0, file$2, 13, 2, 343);
    			attr_dev(div1, "class", "chat_field-message");
    			attr_dev(div1, "data-align", div1_data_align_value = /*message*/ ctx[0].from ? 'from' : 'to');
    			add_location(div1, file$2, 10, 0, 227);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div0, p0);
    			append_dev(p0, t0);
    			append_dev(div0, t1);
    			append_dev(div0, p1);
    			append_dev(p1, t2);
    			/*div1_binding*/ ctx[3](div1);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*message*/ 1 && t0_value !== (t0_value = new Date(/*message*/ ctx[0].date).toLocaleString() + "")) set_data_dev(t0, t0_value);
    			if (dirty & /*message*/ 1 && t2_value !== (t2_value = /*message*/ ctx[0].msg + "")) set_data_dev(t2, t2_value);

    			if (dirty & /*message*/ 1 && div0_class_value !== (div0_class_value = /*message*/ ctx[0].from
    			? 'chat_field-messagefrom'
    			: 'chat_field-messageto')) {
    				attr_dev(div0, "class", div0_class_value);
    			}

    			if (dirty & /*message*/ 1 && div1_data_align_value !== (div1_data_align_value = /*message*/ ctx[0].from ? 'from' : 'to')) {
    				attr_dev(div1, "data-align", div1_data_align_value);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			/*div1_binding*/ ctx[3](null);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Message', slots, []);
    	let { message, chatRef } = $$props;
    	let msgRef;
    	const writable_props = ['message', 'chatRef'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Message> was created with unknown prop '${key}'`);
    	});

    	function div1_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			msgRef = $$value;
    			$$invalidate(1, msgRef);
    		});
    	}

    	$$self.$$set = $$props => {
    		if ('message' in $$props) $$invalidate(0, message = $$props.message);
    		if ('chatRef' in $$props) $$invalidate(2, chatRef = $$props.chatRef);
    	};

    	$$self.$capture_state = () => ({ message, chatRef, msgRef });

    	$$self.$inject_state = $$props => {
    		if ('message' in $$props) $$invalidate(0, message = $$props.message);
    		if ('chatRef' in $$props) $$invalidate(2, chatRef = $$props.chatRef);
    		if ('msgRef' in $$props) $$invalidate(1, msgRef = $$props.msgRef);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*msgRef, chatRef*/ 6) {
    			if (msgRef) {
    				// msgRef.scrollIntoView({ behavior: 'smooth' });
    				chatRef.scrollTo({
    					top: msgRef.offsetTop,
    					behavior: 'smooth'
    				});
    			}
    		}
    	};

    	return [message, msgRef, chatRef, div1_binding];
    }

    class Message extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, { message: 0, chatRef: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Message",
    			options,
    			id: create_fragment$2.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*message*/ ctx[0] === undefined && !('message' in props)) {
    			console.warn("<Message> was created without expected prop 'message'");
    		}

    		if (/*chatRef*/ ctx[2] === undefined && !('chatRef' in props)) {
    			console.warn("<Message> was created without expected prop 'chatRef'");
    		}
    	}

    	get message() {
    		throw new Error("<Message>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set message(value) {
    		throw new Error("<Message>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get chatRef() {
    		throw new Error("<Message>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set chatRef(value) {
    		throw new Error("<Message>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\Footer.svelte generated by Svelte v3.45.0 */
    const file$1 = "src\\Footer.svelte";

    function create_fragment$1(ctx) {
    	let footer;
    	let div;
    	let input;
    	let t;
    	let img;
    	let img_src_value;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			footer = element("footer");
    			div = element("div");
    			input = element("input");
    			t = space();
    			img = element("img");
    			attr_dev(input, "class", "chat_input-text");
    			attr_dev(input, "name", "question");
    			attr_dev(input, "type", "text");
    			attr_dev(input, "placeholder", "type your question ...");
    			add_location(input, file$1, 20, 4, 383);
    			attr_dev(img, "class", "chat_input-icon");
    			if (!src_url_equal(img.src, img_src_value = iconOK)) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "OK");
    			add_location(img, file$1, 24, 4, 574);
    			attr_dev(div, "class", "chat_input");
    			add_location(div, file$1, 19, 2, 353);
    			attr_dev(footer, "class", "cp_footer");
    			add_location(footer, file$1, 18, 0, 323);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, footer, anchor);
    			append_dev(footer, div);
    			append_dev(div, input);
    			set_input_value(input, /*inputVal*/ ctx[0]);
    			append_dev(div, t);
    			append_dev(div, img);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input, "input", /*input_input_handler*/ ctx[4]),
    					listen_dev(input, "keypress", /*onKeyPress*/ ctx[2], false, false, false),
    					listen_dev(img, "click", /*onClick*/ ctx[1], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*inputVal*/ 1 && input.value !== /*inputVal*/ ctx[0]) {
    				set_input_value(input, /*inputVal*/ ctx[0]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(footer);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Footer', slots, []);
    	let { inputVal = '' } = $$props;

    	let { sendMessage = () => {
    		
    	} } = $$props;

    	const onClick = () => {
    		if (inputVal !== '') {
    			sendMessage(inputVal);
    			$$invalidate(0, inputVal = '');
    		}
    	};

    	const onKeyPress = e => {
    		if (e.charCode === 13) onClick();
    	};

    	const writable_props = ['inputVal', 'sendMessage'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Footer> was created with unknown prop '${key}'`);
    	});

    	function input_input_handler() {
    		inputVal = this.value;
    		$$invalidate(0, inputVal);
    	}

    	$$self.$$set = $$props => {
    		if ('inputVal' in $$props) $$invalidate(0, inputVal = $$props.inputVal);
    		if ('sendMessage' in $$props) $$invalidate(3, sendMessage = $$props.sendMessage);
    	};

    	$$self.$capture_state = () => ({
    		iconOK,
    		inputVal,
    		sendMessage,
    		onClick,
    		onKeyPress
    	});

    	$$self.$inject_state = $$props => {
    		if ('inputVal' in $$props) $$invalidate(0, inputVal = $$props.inputVal);
    		if ('sendMessage' in $$props) $$invalidate(3, sendMessage = $$props.sendMessage);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [inputVal, onClick, onKeyPress, sendMessage, input_input_handler];
    }

    class Footer extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, { inputVal: 0, sendMessage: 3 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Footer",
    			options,
    			id: create_fragment$1.name
    		});
    	}

    	get inputVal() {
    		throw new Error("<Footer>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set inputVal(value) {
    		throw new Error("<Footer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get sendMessage() {
    		throw new Error("<Footer>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set sendMessage(value) {
    		throw new Error("<Footer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\App.svelte generated by Svelte v3.45.0 */

    const { console: console_1 } = globals;
    const file = "src\\App.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[11] = list[i];
    	return child_ctx;
    }

    // (120:6) {#if messages.length !== 0}
    function create_if_block(ctx) {
    	let each_blocks = [];
    	let each_1_lookup = new Map();
    	let each_1_anchor;
    	let current;
    	let each_value = /*messages*/ ctx[0];
    	validate_each_argument(each_value);
    	const get_key = ctx => /*message*/ ctx[11].date;
    	validate_each_keys(ctx, each_value, get_each_context, get_key);

    	for (let i = 0; i < each_value.length; i += 1) {
    		let child_ctx = get_each_context(ctx, each_value, i);
    		let key = get_key(child_ctx);
    		each_1_lookup.set(key, each_blocks[i] = create_each_block(key, child_ctx));
    	}

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each_1_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*messages, chatRef*/ 5) {
    				each_value = /*messages*/ ctx[0];
    				validate_each_argument(each_value);
    				group_outros();
    				validate_each_keys(ctx, each_value, get_each_context, get_key);
    				each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value, each_1_lookup, each_1_anchor.parentNode, outro_and_destroy_block, create_each_block, each_1_anchor, get_each_context);
    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].d(detaching);
    			}

    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(120:6) {#if messages.length !== 0}",
    		ctx
    	});

    	return block;
    }

    // (121:8) {#each messages as message (message.date)}
    function create_each_block(key_1, ctx) {
    	let first;
    	let message;
    	let current;

    	message = new Message({
    			props: {
    				message: /*message*/ ctx[11],
    				chatRef: /*chatRef*/ ctx[2]
    			},
    			$$inline: true
    		});

    	const block = {
    		key: key_1,
    		first: null,
    		c: function create() {
    			first = empty();
    			create_component(message.$$.fragment);
    			this.first = first;
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, first, anchor);
    			mount_component(message, target, anchor);
    			current = true;
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			const message_changes = {};
    			if (dirty & /*messages*/ 1) message_changes.message = /*message*/ ctx[11];
    			if (dirty & /*chatRef*/ 4) message_changes.chatRef = /*chatRef*/ ctx[2];
    			message.$set(message_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(message.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(message.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(first);
    			destroy_component(message, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(121:8) {#each messages as message (message.date)}",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let main;
    	let header;
    	let t0;
    	let section;
    	let div;
    	let t1;
    	let footer;
    	let current;

    	header = new Header({
    			props: { Session: /*Session*/ ctx[1] },
    			$$inline: true
    		});

    	let if_block = /*messages*/ ctx[0].length !== 0 && create_if_block(ctx);

    	footer = new Footer({
    			props: {
    				sendMessage: /*sendMessage*/ ctx[4],
    				inputVal: /*inputVal*/ ctx[3]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			main = element("main");
    			create_component(header.$$.fragment);
    			t0 = space();
    			section = element("section");
    			div = element("div");
    			if (if_block) if_block.c();
    			t1 = space();
    			create_component(footer.$$.fragment);
    			attr_dev(div, "class", "chat_field");
    			add_location(div, file, 118, 4, 3629);
    			attr_dev(section, "class", "cp_body");
    			add_location(section, file, 117, 2, 3598);
    			attr_dev(main, "class", "cp");
    			attr_dev(main, "id", "App");
    			add_location(main, file, 115, 0, 3536);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			mount_component(header, main, null);
    			append_dev(main, t0);
    			append_dev(main, section);
    			append_dev(section, div);
    			if (if_block) if_block.m(div, null);
    			/*div_binding*/ ctx[5](div);
    			append_dev(main, t1);
    			mount_component(footer, main, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const header_changes = {};
    			if (dirty & /*Session*/ 2) header_changes.Session = /*Session*/ ctx[1];
    			header.$set(header_changes);

    			if (/*messages*/ ctx[0].length !== 0) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*messages*/ 1) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(div, null);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(header.$$.fragment, local);
    			transition_in(if_block);
    			transition_in(footer.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(header.$$.fragment, local);
    			transition_out(if_block);
    			transition_out(footer.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			destroy_component(header);
    			if (if_block) if_block.d();
    			/*div_binding*/ ctx[5](null);
    			destroy_component(footer);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	let messages = [], inputVal = '', Session, myWorker, chatRef;
    	let isNewSession = false;
    	const swListener = new BroadcastChannel('swListener');

    	swListener.onmessage = function ({ data }) {
    		console.log('swListener Received', data);
    		let message = JSON.parse(data);

    		if (message.svc) {
    			$$invalidate(1, Session.online = (/ONLINE/i).test(message.svc), Session);
    			saveSession();
    		}

    		if (message.wsState) {
    			//...webSocket state messages
    			if (message.wsState === 'init') {
    				let innerMsg = new swMessageObj('init', `${WS_URL}?userName=${Session.userID}&userHost=${Session.userHOST}`, `${Session.userID}`);
    				myWorker?.postMessage(JSON.stringify(innerMsg));
    			}
    		}

    		if (message.wsUser) {
    			//...restore UserId
    			$$invalidate(1, Session.userID = message.wsUser, Session);
    		}

    		if (message.to) {
    			//...WebSocket clients messages
    			$$invalidate(0, messages = [...messages, message]);
    		}
    	};

    	const sendMessage = val => {
    		let message = new MessageObj(val, Session.userID);
    		$$invalidate(0, messages = [...messages, message]);
    		let swMessage = new swMessageObj('post', message);
    		myWorker.postMessage(JSON.stringify(swMessage));
    	};

    	const saveMessages = () => {
    		if (Session) {
    			$$invalidate(1, Session.userMSGS = messages, Session);
    			saveSession();
    		}
    	};

    	const saveSession = () => {
    		sessionStorage.setItem('tchat', JSON.stringify(Session));
    	};

    	onMount(async () => {
    		$$invalidate(1, Session = JSON.parse(sessionStorage.getItem('tchat')) || {});
    		isNewSession = isEmpty(Session) ? true : false;

    		/**
     * restore the user's session from sessionStorage, 
     * if there is nothing there, we get the data from the server
     */
    		if (isNewSession) {
    			if (!Session.userID) $$invalidate(1, Session.userID = random_id(), Session);
    			let response = await fetch(`${URL}/api/auth/usersite/${HOST}`).then(response => response.json()).catch(e => e);
    			$$invalidate(1, Session.userTitle = response.title ? response.title : 'FAKE corporation.', Session);

    			$$invalidate(
    				1,
    				Session.userDesc = response.desc
    				? response.desc
    				: 'I\'am Your online Manager',
    				Session
    			);

    			$$invalidate(1, Session.userAvatar = response.avatar ? response.avatar : iconAvatar, Session);

    			$$invalidate(
    				1,
    				Session.userGreeting = response.greeting
    				? response.greeting
    				: "Hello. What can I help You ?...",
    				Session
    			);

    			$$invalidate(1, Session.online = false, Session); // ... operator is OFFLINE by default
    			$$invalidate(1, Session.userHOST = HOST, Session);

    			$$invalidate(
    				1,
    				Session.userMSGS = [
    					{
    						to: 'me',
    						msg: Session.userGreeting,
    						date: Date.now()
    					}
    				],
    				Session
    			);

    			$$invalidate(0, messages = Session.userMSGS);
    			saveSession();
    		} else {
    			$$invalidate(0, messages = Session.userMSGS);
    		}

    		/**
     * set serviceWorker if it does not exist or activate it if it does
     */
    		if (navigator.serviceWorker.controller) {
    			myWorker = navigator.serviceWorker.controller;
    		} else {
    			navigator.serviceWorker.register('websocket-worker.js').then(() => navigator.serviceWorker.ready.then(worker => {
    				myWorker = worker.active;
    			})).catch(err => console.log(err));
    		}
    	});

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	function div_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			chatRef = $$value;
    			$$invalidate(2, chatRef);
    		});
    	}

    	$$self.$capture_state = () => ({
    		onMount,
    		iconAvatar,
    		random_id,
    		isEmpty,
    		WS_URL,
    		URL,
    		HOST,
    		swMessageObj,
    		MessageObj,
    		Header,
    		Message,
    		Footer,
    		messages,
    		inputVal,
    		Session,
    		myWorker,
    		chatRef,
    		isNewSession,
    		swListener,
    		sendMessage,
    		saveMessages,
    		saveSession
    	});

    	$$self.$inject_state = $$props => {
    		if ('messages' in $$props) $$invalidate(0, messages = $$props.messages);
    		if ('inputVal' in $$props) $$invalidate(3, inputVal = $$props.inputVal);
    		if ('Session' in $$props) $$invalidate(1, Session = $$props.Session);
    		if ('myWorker' in $$props) myWorker = $$props.myWorker;
    		if ('chatRef' in $$props) $$invalidate(2, chatRef = $$props.chatRef);
    		if ('isNewSession' in $$props) isNewSession = $$props.isNewSession;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*messages*/ 1) {
    			if (messages.length !== 0) saveMessages();
    		}
    	};

    	return [messages, Session, chatRef, inputVal, sendMessage, div_binding];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
      target: document.body,
      props: {
        // name: 'world'
      }
    });

    return app;

})();
//# sourceMappingURL=bundle.js.map
