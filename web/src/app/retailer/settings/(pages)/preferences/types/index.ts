export interface IPreferences {
    theme: 'light' | 'dark' | 'system';
    language: 'en' | 'pt-BR' | 'es';
    dateFormat: 'dd_mm_yyyy' | 'mm_dd_yyyy' | 'yyyy_mm_dd';
    reduceMotion: boolean;
};