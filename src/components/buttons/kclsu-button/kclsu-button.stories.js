import { html } from 'lit-html';

export default {
  title: 'Example/Button',
  argTypes: {
    content: { control: 'text' },
    link: { control: 'text' },
    small: { control: 'boolean' },
    purple: { control: 'boolean' },
    newtab: { control: 'boolean' },
  },
};

export const Button = ({
  content = "My Button",
  link = '/',
  small = false,
  purple = false,
  newtab = false,
}) => html`<kclsu-button
    ?small="${small}"
    ?purple="${purple}"
    ?newtab="${newtab}"
    link="${link}"
  >${content}</kclsu-button>`

Button.args = {
  content: "My Button",
  link: '/',
  small: false,
  purple: false,
  newtab: false,
}
