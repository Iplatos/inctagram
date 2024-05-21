const config = require('@it-incubator/stylelint-config/node_modules/stylelint-config-clean-order');

const ORDER = 'order/order';
const EMPTY_LINE = 'at-rule-empty-line-before';

const finalConfig = {
  extends: '@it-incubator/stylelint-config',
  rules: {
    'scss/at-extend-no-missing-placeholder': null,
    'scss/percent-placeholder-pattern': [
      '^(-?[a-z][a-z0-9]*)((-[a-z0-9]+)|([a-zA-Z0-9]+))*$',
      {
        message: 'Expected placeholder to be either kebab-case or lowerCamelCase',
      },
    ],
    'scss/dollar-variable-colon-space-after': 'always-single-line',
  },
};

const rules = config?.rules ?? {};

if (rules[ORDER]) {
  let [primaryOptions, secondaryOptions = {}] = rules[ORDER];

  // Target `@media` at-rule to insert `@include media-breakpoint` before it so that it has higher priority
  let index = primaryOptions.findLastIndex(
    o => o.type === 'at-rule' && o.name === 'media' && o.hasBlock === true
  );

  index = index === -1 ? primaryOptions.length : index;
  primaryOptions = [...primaryOptions];
  primaryOptions.splice(index, 0, {
    type: 'at-rule',
    name: 'include',
    parameter: 'media-breakpoint',
  });

  finalConfig.rules[ORDER] = [primaryOptions, secondaryOptions];
}

if (rules[EMPTY_LINE]) {
  const rule = Array.isArray(rules[EMPTY_LINE]) ? [...rules[EMPTY_LINE]] : [rules[EMPTY_LINE]];

  rule[1] = rule[1]
    ? { ...rule[1], ignoreAtRules: [...(rule[1]?.ignoreAtRules ?? []), 'else if', 'else'] }
    : { ignoreAtRules: ['else if', 'else'] };

  finalConfig.rules[EMPTY_LINE] = rule;
}

module.exports = finalConfig;
