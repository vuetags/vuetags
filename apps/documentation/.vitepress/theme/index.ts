import DefaultTheme from 'vitepress/theme';
// @ts-expect-error No type defs for the css import, which is fine.
import './custom.css';

export default DefaultTheme;
