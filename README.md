# DataVue Analytics Dashboard

A production-ready adn highly polished Vue 3 web analytics dashboard featuring dynamic ECharts visualizations, responsive UI elements, strict TypeScript configuration, and scalable Pinia global state management.

## Tech Stack
- Vue 3 (Composition API `script setup`)
- TypeScript (Strict Mode)
- Tailwind CSS v3
- Apache ECharts (`vue-echarts`)
- Pinia
- Vue Router 4
- Axios
- @vueuse/core

## Setup & Installation

1. Install dependencies
```bash
npm install
```

2. Run development server (with autoresize and live reload)
```bash
npm run dev
```

3. Type-Check and Build for Production
```bash
npm run build
```

## Features Complete
- **Global State**: Filter across "All Time", "Monthly", "Weekly", "Daily" using Pinia.
- **Responsive Layout**: Optimized mobile navigation and adaptive charts.
- **Charts**: Comprehensive scatter, heatmap, multi-line, and stacked bar Echarts wrappers.
- **Data Export**: One-click download charts directly to PNG or CSV.
