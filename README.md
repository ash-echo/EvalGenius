# EvalGenius 🧠✨

> **Pioneering the future of educational assessment with Agentic AI. Precision, speed, and fairness in every grade.**

![Hero](assets/hero.png)

## 🚀 About EvalGenius

**Grading is broken.** Educators spend countless hours manually reviewing papers, a process that is slow, prone to fatigue-induced errors, and takes time away from actual teaching.

**EvalGenius fixes this.** We have built a cutting-edge, AI-powered grading platform designed to revolutionize how educators assess student work. By leveraging advanced **multimodal AI agents**, EvalGenius can read handwritten notes, understand complex diagrams, and grade assignments with human-level precision—in seconds.

Our mission is simple: **Free educators from the burden of manual grading.**

## ✨ Key Features

### 📝 Handwritten Notes Evaluated Instantly
Gone are the days of deciphering messy handwriting. Upload answer keys and handwritten PDFs, and let our system handle the rest.
*   **Multimodal Ingestion**: Accepts PDFs, images, and scanned documents.
*   **Context-Aware**: Understands the difference between scratch work and final answers.
*   **Speed**: Grades full-length papers in under 30 seconds.

![Upload UI](assets/analyze.png)

### 🤖 The Agentic Workflow
EvalGenius isn't just a wrapper around an LLM; it's a sophisticated **Agentic Workflow** that mimics the cognitive process of a human grader.
1.  **Ingestion**: The system deconstructs the document, performing pixel-perfect OCR.
2.  **Reasoning**: Agents analyze the student's logic, cross-referencing it with the rubric.
3.  **Report**: A final, detailed report is generated with actionable feedback and precise scoring.

![Workflow](assets/workflow.png)

### 👁️ Vision Layer & Deep Analysis
Our proprietary **Vision Layer** powers the core intelligence. It doesn't just "read" text; it "sees" the paper.
*   **Diagram Recognition**: Identifies and evaluates scientific diagrams, charts, and graphs.
*   **Logic Mapping**: Traces the student's steps in math and physics problems to award partial credit accurately.

![Analysis](assets/architecture.png)
*(Note: This image represents the architecture powering the vision layer)*

## 🛠️ Tech Stack

EvalGenius is built on a modern, high-performance stack designed for speed, scalability, and reliability.



-   **Frontend**:
    ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
    ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
    ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
    ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
    ![Framer Motion](https://img.shields.io/badge/Framer-black?style=for-the-badge&logo=framer&logoColor=blue)

-   **AI Core**:
    ![Google Gemini](https://img.shields.io/badge/Google%20Gemini-8E75B2?style=for-the-badge&logo=google&logoColor=white)
    ![Google GenAI SDK](https://img.shields.io/badge/Google_GenAI_SDK-4285F4?style=for-the-badge&logo=google&logoColor=white)

-   **Document Processing**:
    ![PDF.js](https://img.shields.io/badge/PDF.js-DC2C27?style=for-the-badge&logo=adobeacrobatreader&logoColor=white)
    ![Canvas API](https://img.shields.io/badge/Canvas_API-E34F26?style=for-the-badge&logo=html5&logoColor=white)

-   **Data & Validation**:
    ![JSON Schema](https://img.shields.io/badge/JSON_Schema-000000?style=for-the-badge&logo=json&logoColor=white)

## 🏗️ Architecture

EvalGenius employs a serverless, client-side architecture for maximum privacy and low latency. The entire grading pipeline runs securely, leveraging the power of Gemini 2.5 for reasoning.

![Architecture](assets/architecture.png)

## 🎥 Demo

See EvalGenius in action!

Webiste Link:-

![Adobe Express - gif1 (4)](https://github.com/user-attachments/assets/53b17984-f12d-4150-9034-05e84b4d2d68)
![Adobe Express - giffy2](https://github.com/user-attachments/assets/dd8c32c7-1a3b-4e7b-9329-4e8e0ebca6b7)


## 🚀 Getting Started

### Prerequisites
-   Node.js (v18 or higher)
-   npm or yarn
-   Google AI Studio API Key

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/evalgenius.git
    cd evalgenius
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Set up Environment Variables**
    Create a `.env.local` file in the root directory and add your API key:
    ```env
    VITE_GEMINI_API_KEY=your_api_key_here
    ```

4.  **Run the development server**
    ```bash
    npm run dev
    ```

## 🤝 Contribution

Colaborated with Hemanth Kumar,Thejesh

## 📄 License

This project is licensed under the MIT License.

---
<p align="center">
  Built By Ashwath ⚡
</p>
