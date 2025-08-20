tailwind = window.tailwind || {};
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: { sans: ["Inter", "ui-sans-serif", "system-ui"] },
          colors: {
            ink: { 900: "#0B1220", 700: "#1F2A44", 500: "#3A4B6A" },
            brand: { 600: "#1E3D5A", 500: "#214767", 400: "#2A5D86" },
            accent: { 500: "#C1440E" }
          },
          boxShadow: { soft: "0 10px 25px -8px rgba(0,0,0,.15)" }
        }
      }
    }