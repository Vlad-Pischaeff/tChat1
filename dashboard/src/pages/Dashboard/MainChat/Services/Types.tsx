export const MENU = [ "Todos", "Notes", "Mail", "Answers" ] as const;
export type tServiceMenu = typeof MENU[number];
