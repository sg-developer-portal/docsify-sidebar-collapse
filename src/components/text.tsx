type TextNodeProps = {
  text: string;
};
export default function TextNode({ text }: TextNodeProps) {
  return <p>{text}</p>;
}
