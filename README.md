<div style="text-align: center;">
	<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="#000"
			viewBox="0 0 24 24"
			stroke="currentColor"
			width="100"
		>
	<path
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={1}
				d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
			/>
	</svg>
</div>

# <div style="text-align: center;">Budget App [(Live)](https://react-typescript-budget.herokuapp.com/)</div>

A full stack expense tracking app built using React, Typescript, Redux, and Firebase. You can add/remove expenses and sort them by date, amount, or title.

## Install


```
npm install
```

## Usage


To get it running locally you'll need to add your own Firebase config to `.env`

```
npm start
```

## Testing


Jest and Enzyme tests are run on a separate Firebase database, with config in `.env.test`.

```
npm run test
```
