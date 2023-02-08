'use strict';

const Websites = require('#s/models/websites');

class WebsitesService {
    async aggregateWebsites(req) {
        let websites;
        const { offset, num } = req.query;

        if (offset && num) {
            websites = await Websites.aggregate([
                {
                    $match: { user: req.id }
                },
                {
                    $facet: {
                        data: [
                            { $skip: +offset },
                            { $limit: +num }
                        ]
                    }
                }
            ]);
            const [value] = websites;
            websites = [...value.data];
        } else {
            // use with authorization middleware
            websites = await Websites.find({ user: req.id });

            // use without authorization middleware
            // websites = await Websites.find();
        }

        return websites;
    }
}

module.exports = new WebsitesService();
