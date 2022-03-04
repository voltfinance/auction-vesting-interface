import styled from 'styled-components'

const TextWrapper = styled(Text)<{ color}>`
  font-family: 'Inter';
  color: ${({ color, theme }) => (theme)[color]};
`

export const TYPE = {
  main(props) {
    return <TextWrapper fontWeight={500} color={'text2'} {...props} />
  },
  link(props) {
    return <TextWrapper fontWeight={500} color={'primary1'} {...props} />
  },
  black(props) {
    return <TextWrapper fontWeight={500} color={'text1'} {...props} />
  },
  body(props) {
    return <TextWrapper fontWeight={400} fontSize={16} color={'text1'} {...props} />
  },
  largeHeader(props) {
    return <TextWrapper fontWeight={600} fontSize={24} {...props} />
  },
  mediumHeader(props) {
    return <TextWrapper fontWeight={500} fontSize={20} {...props} />
  },
  subHeader(props) {
    return <TextWrapper fontWeight={400} fontSize={14} {...props} />
  },
  blue(props) {
    return <TextWrapper fontWeight={500} color={'primary1'} {...props} />
  },
  yellow(props) {
    return <TextWrapper fontWeight={500} color={'yellow1'} {...props} />
  },
  darkGray(props) {
    return <TextWrapper fontWeight={500} color={'text3'} {...props} />
  },
  gray(props) {
    return <TextWrapper fontWeight={500} color={'bg3'} {...props} />
  },
  italic(props) {
    return <TextWrapper fontWeight={500} fontSize={12} fontStyle={'italic'} color={'text2'} {...props} />
  },
  error({ error, ...props }) {
    return <TextWrapper fontWeight={500} color={error ? 'red1' : 'text2'} {...props} />
  }
}