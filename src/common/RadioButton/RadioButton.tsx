import React, { ChangeEvent, InputHTMLAttributes, DetailedHTMLProps } from 'react'

// eslint-disable-next-line import/no-unresolved
import css from 'RadioButton.module.css'

type DefaultRadioPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

type SuperRadioPropsType = DefaultRadioPropsType & {
  options?: any[]
  onChangeOption?: (option: any) => void
}

const SuperRadio: React.FC<SuperRadioPropsType> = ({
  type,
  name,
  options,
  value,
  onChange,
  onChangeOption,
  ...restProps
}) => {
  const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(e)
    onChangeOption && onChangeOption(e.currentTarget.value)
  }

  const mappedOptions: any[] = options
    ? options.map((o, i) => (
        <label key={name + '-' + i}>
          <input
            className={css.radio}
            type={'radio'}
            name={name}
            checked={o === value}
            value={o}
            onChange={onChangeCallback}
            // name, checked, value, onChange
          />
          {o}
        </label>
      )) // map options with key
    : []

  return <>{mappedOptions}</>
}

export default SuperRadio
