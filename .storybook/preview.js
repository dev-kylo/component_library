// @ts-check
import { render } from 'lit-html';
import { addons } from '@storybook/addons';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  options: {
    storySort: {
      order: ['Getting Started'],
    },
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  docs: {
    source: {
      type: 'dynamic',
    },
    extractComponentDescription: (component, { notes }) => {
      if (notes) {
        return typeof notes === 'string' ? notes : notes.markdown || notes.text;
      }
      return null;
    },
  }
}

function skipSourceRender(context) {
  const sourceParams = context?.parameters.docs?.source;
  const isArgsStory = context?.parameters.__isArgsStory;

  // always render if the user forces it
  if (sourceParams?.type === 'dynamic') {
    return false;
  }

  // never render if the user is forcing the block to render code, or
  // if the user provides code, or if it's not an args story.
  return !isArgsStory || sourceParams?.code || sourceParams?.type === 'code';
}

function sourceDecorator(storyFn, context) {
  var story = storyFn();

  if (!skipSourceRender(context)) {
    const container = document.createElement('div');
    render(story, container);
    const source = container.innerHTML.replace(/<!---->/g, '');
    if (source)
      addons.getChannel().emit('storybook/docs/snippet-rendered', context?.id, source);
  }

  return story;
}

export const decorators = [sourceDecorator];
