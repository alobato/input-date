# Input date (pt-BR)

> Input date react component

## Install

```sh
yarn add @alobato/input-date
```

## Usage

```js
import InputDate from '@alobato/input-date'
...

<InputDate placeholder='DD/MM/AAAA' name='examinedAt' value={values.examinedAt} onChange={(e, value, maskedValue) => setFieldValue('examinedAt', value)} onBlur={handleBlur} />
```
