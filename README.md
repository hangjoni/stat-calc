## TODO:

- handle NaN in Power and pValue
- error handling
- add route props so user can reload and keep their results
- add back button
- check the logic for A/B test
- add logic for checking minimum effect size

## Resources:

- [Frequentist A/B testing from scratch](https://www.kaggle.com/code/cstorm3000/frequestist-a-b-testing-from-scratch)
- [Bayesian A/B testing from scratch](https://www.kaggle.com/code/cstorm3000/bayesian-a-b-testing-from-scratch)

## Using Tailwind with PostCSS build tool

Here we didn't have to use `npx tailwindcss ...` to convert input.css directives into output.css because we rely on build tool. In particular we are using PostCSS with autoprefixer plugin . See `postcss.config.js`

## Deployment

- `npm run build`
- To see the site locally `npm run serve`
- Deploy on Netlify: publish the produced `dist` folder

## Live demo

The deployed app is hosted on Netlify [here](https://heroic-strudel-d753ce.netlify.app/#/)
