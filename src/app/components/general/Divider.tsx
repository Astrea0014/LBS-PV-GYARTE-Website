interface DividerProp {
  responsive: boolean;
}


export default function Divider({responsive}: DividerProp) {

  return (

    <div className={`w-8/12 bg-gray-400 ${responsive ? "xl:hidden" : ""}`} style={{height:"1px"}}/>

  );

}