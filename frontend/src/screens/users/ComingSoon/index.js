const ComingSoonSVG = () => (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 800 600"
            width="800"
            height="600"
        >
            <rect width="800" height="600" fill="#f3f4f6" />

            {/* Main Circle Layers */}
            <circle cx="400" cy="300" r="100" fill="#4f46e5" opacity="0.1" />
            <circle cx="400" cy="300" r="80" fill="#4f46e5" opacity="0.2" />
            <circle cx="400" cy="300" r="60" fill="#4f46e5" opacity="0.3" />

            {/* Text */}
            <text
                x="50%"
                y="50%"
                textAnchor="middle" // React uses "textAnchor" instead of "text-anchor"
                fontFamily="'Arial', sans-serif"
                fontSize="48"
                fill="#4b5563"
                dy=".3em"
            >
                Coming Soon
            </text>

            {/* Animated Spinner */}
            <g>
                <circle
                    cx="400"
                    cy="420"
                    r="20"
                    fill="none"
                    stroke="#4f46e5"
                    strokeWidth="4" // React uses "strokeWidth" instead of "stroke-width"
                    strokeDasharray="31.4"
                    strokeDashoffset="0"
                >
                    <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from="0 400 420"
                        to="360 400 420"
                        dur="1.5s"
                        repeatCount="indefinite"
                    />
                </circle>
            </g>
        </svg>
    </div>
);

export default ComingSoonSVG;
