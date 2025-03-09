
---

# Native Module Lynx

**Native Module Lynx** is a project built with **ReactLynx**, bootstrapped using the `create rspeedy` template. This project demonstrates the integration of a native module to request location permissions and get the location in a Lynx application.

**Attention**! for this project to work locally, you need to follow the steps to implement native code. 

[Native Modules Guide](https://lynxjs.org/guide/use-native-modules.html#platform=android)

---

## 🚀 Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

- Ensure you have [Node.js](https://nodejs.org/) installed.
- Install the [LynxExplorer App](https://lynxjs.org/) on your mobile device to preview the project.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/mensonones/lynx-app.git
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Start the development server:
   ```bash
   pnpm run dev
   ```

4. Scan the QRCode displayed in the terminal using the **LynxExplorer App** to view the application.

---

## 🛠️ Development

- The main application file is located at `src/App.tsx`. Edit this file to make changes to the project.
- The development server automatically updates the app as you edit the files.

---

## 📂 Project Structure

- **`src/`**: Contains the application source code.
  - **`App.tsx`**: Main application component.
  - **`assets/`**: Stores resources such as images.
- **`nativecode/`**: Contains native code related to location permission module and get location.

---

## 📱 Native Module

This project implements a native module to request and obtain location permissions. To learn how to create native modules with Lynx, refer to the [official documentation](https://lynxjs.org/guide/use-native-modules.html#platform=android).

---

## 📸 Preview

![Preview](https://github.com/mensonones/lynx-app/blob/main/src/assets/gif.gif)

---

## 📚 Useful Resources

- [Lynx Documentation](https://lynxjs.org/)
- [Native Modules Guide](https://lynxjs.org/guide/use-native-modules.html#platform=android)

---

## 🤝 Contributing

Contributions are welcome! Feel free to open an **issue** or submit a **pull request**.

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Made with ❤️ by [Emerson Vieira](https://github.com/mensonones).  

---
