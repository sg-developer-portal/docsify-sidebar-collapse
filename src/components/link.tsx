type LinkNodeProps = {
  link: string;
  text: string;
};
export default function LinkNode({ link, text }: LinkNodeProps) {
  return <a href={link}>{text}</a>;
}
