import * as React from "react";
import { SVGProps } from "react";
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={48}
		height={48}
		className="icon"
		viewBox="0 0 1024 1024"
		{...props}
	>
		<path d="M128 597.333a42.667 42.667 0 0 1 42.667-42.666h512a128 128 0 0 0 128-128V256A42.667 42.667 0 1 1 896 256v170.667A213.333 213.333 0 0 1 682.667 640h-512A42.667 42.667 0 0 1 128 597.333z" />
		<path d="M140.501 627.499a42.667 42.667 0 0 1 0-60.331l170.667-170.667a42.667 42.667 0 0 1 60.33 60.331l-140.5 140.501 140.5 140.502a42.667 42.667 0 1 1-60.33 60.33L140.501 627.5z" />
	</svg>
);
export default SvgComponent;
