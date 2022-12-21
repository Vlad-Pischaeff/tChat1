const theme = {
    dark: {
        '--C1': '#3F8A8C',
        '--C2': '#0C5679',
        '--C3': '#E5340B',
        '--C4': '#F28A0F',
        '--C5': '#FFE7BD',
        '--C6': '#B0B0B0',
        '--C7': '#00cad1',
        '--C8': '#646464',
        '--CA1': '#305d7220',
        '--BG': '#0F1A2B',
    },
    light: {
        '--C1': '#3F8A8C',
        '--C2': '#FFE7BD',
        '--C3': '#E5340B',
        '--C4': '#F28A0F',
        '--C5': '#0F1A2B',
        '--C6': '#B0B0B0',
        '--C7': '#00cad1',
        '--C8': '#B0B0B0',
        '--CA1': '#305d7220',
        '--BG': 'ivory',
    },
};

export type tTheme = keyof typeof theme;

export const changeTheme = (selectedTheme: tTheme) => {
    const style = document.documentElement.style;

    Object.entries(theme[selectedTheme])
        .forEach(([ key, value ]) => {
            style.setProperty(key as string, value as string);
        });
};
