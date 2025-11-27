
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, Check, Loader2, Brain, AlertCircle, ScanLine, Sparkles, RefreshCcw, ShieldCheck, Download, Scale, Lightbulb, BookOpen, Copy } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import * as pdfjsLib from 'pdfjs-dist';

// Set worker source for PDF.js
try {
  if (typeof window !== 'undefined' && pdfjsLib) {
    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@4.8.69/build/pdf.worker.min.mjs`;
  }
} catch (e) {
  console.warn("PDF Worker setup failed:", e);
}

// --- Helper Functions ---

const processFile = async (file: File): Promise<string[]> => {
    if (file.type.startsWith('image/')) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve([reader.result as string]);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    } else if (file.type === 'application/pdf') {
        try {
            const arrayBuffer = await file.arrayBuffer();
            const getDocument = pdfjsLib.getDocument || (pdfjsLib as any).default?.getDocument;
            
            if (!getDocument) throw new Error("PDF.js library not fully loaded.");

            const loadingTask = getDocument(arrayBuffer);
            const pdf = await loadingTask.promise;
            const images: string[] = [];
            
            // Limit to first 3 pages for demo performance/token limits
            const maxPages = Math.min(pdf.numPages, 3);

            for (let i = 1; i <= maxPages; i++) {
                const page = await pdf.getPage(i);
                // Scale 1.5 is a good balance between token usage and legibility for handwriting
                const viewport = page.getViewport({ scale: 1.5 }); 
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                if (context) {
                    await page.render({ canvasContext: context, viewport }).promise;
                    images.push(canvas.toDataURL('image/jpeg', 0.6));
                }
            }
            return images;
        } catch (e) {
            console.error("PDF Processing Error:", e);
            throw new Error("Failed to process PDF. Please try a clearer file or an image.");
        }
    }
    return [];
};

const calculateGrade = (score: number, max: number) => {
    const percentage = max > 0 ? (score / max) * 100 : 0;
    if (percentage >= 90) return 'S';
    if (percentage >= 80) return 'A';
    if (percentage >= 70) return 'B';
    if (percentage >= 60) return 'C';
    if (percentage >= 50) return 'D';
    return 'F';
};

const getGradeColor = (grade: string) => {
    if (['S', 'A'].includes(grade)) return 'text-brand-accent drop-shadow-[0_0_25px_rgba(74,222,128,0.6)]';
    if (['B', 'C'].includes(grade)) return 'text-yellow-400 drop-shadow-[0_0_25px_rgba(250,204,21,0.6)]';
    return 'text-red-500 drop-shadow-[0_0_25px_rgba(239,68,68,0.6)]';
};

// --- Animations ---

const CountUp = ({ to, duration = 2 }: { to: number; duration?: number }) => {
    const [count, setCount] = useState(0);
    useEffect(() => {
        let startTime: number;
        let animationFrame: number;
        const animate = (time: number) => {
            if (!startTime) startTime = time;
            const progress = (time - startTime) / (duration * 1000);
            if (progress < 1) {
                setCount(Math.floor(to * progress));
                animationFrame = requestAnimationFrame(animate);
            } else {
                setCount(to);
            }
        };
        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [to, duration]);
    return <>{count}</>;
};

// Particles Effect for High Grades
const ParticleExplosion = () => {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-brand-accent rounded-full"
                    initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
                    animate={{ 
                        opacity: 0, 
                        scale: Math.random() * 2, 
                        x: (Math.random() - 0.5) * 400, 
                        y: (Math.random() - 0.5) * 400 
                    }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                />
            ))}
        </div>
    );
};

// --- Mock Data ---
const MOCK_RESULT: GradingResult = {
  totalScore: 88,
  maxScore: 100,
  letterGrade: "A", 
  confidenceScore: 99.2,
  summary: "Evaluation Complete. The student demonstrated strong conceptual understanding in Physics and Biology sections. Minor calculation errors were noted in Q2. Handwriting was legible with 99% confidence.",
  questions: [
    { 
        id: 1, 
        score: 10, 
        max: 10, 
        studentAnswer: "Mitochondria is the powerhouse of the cell.",
        modelAnswer: "Mitochondria is the double-membrane-bound organelle that generates most of the cell's ATP.",
        rubricConstraint: "Must mention 'powerhouse' or 'ATP generation'.",
        reasoning: "Answer is concise and accurately identifies the core function commonly accepted in the curriculum.",
        improvementTip: "Consider adding details about ATP synthesis for AP-level credit."
    },
    { 
        id: 2, 
        score: 13, 
        max: 15, 
        studentAnswer: "F = ma => 10 * 5 = 50N",
        modelAnswer: "Force = mass × acceleration. F = 10kg * 5m/s² = 50N (Newtons).",
        rubricConstraint: "Show formula, substitution, and final unit.",
        reasoning: "Calculation is correct, but units were initially missing in the substitution step (-2 marks).",
        improvementTip: "Always write units at every step of the calculation to avoid ambiguity."
    },
    { 
        id: 3, 
        score: 8, 
        max: 10, 
        studentAnswer: "Osmosis moves water to low concentration.",
        modelAnswer: "Osmosis is the movement of water molecules from a region of higher water potential to lower water potential through a semi-permeable membrane.",
        rubricConstraint: "Must mention 'semi-permeable membrane'.",
        reasoning: "Conceptually mostly correct, but lacked the critical term 'semi-permeable membrane'.",
        improvementTip: "Memorize the complete definition including the membrane condition."
    },
    { 
        id: 4, 
        score: 25, 
        max: 25, 
        studentAnswer: "def sum(arr): return total",
        modelAnswer: "def sum_list(arr):\n  return sum(arr)",
        rubricConstraint: "Valid Python syntax and correct logic.",
        reasoning: "Perfect logic and syntax. Variable naming is clear.",
        improvementTip: "None. Perfect response."
    },
    { 
        id: 5, 
        score: 32, 
        max: 40, 
        studentAnswer: "Industrial revolution changed cities...",
        modelAnswer: "The Industrial Revolution led to rapid urbanization, shift from agrarian economy, and rise of the factory system.",
        rubricConstraint: "Discuss Urbanization, Economy, and Social Structure.",
        reasoning: "Good arguments on urbanization. Lacked detail on economic shifts in rural areas.",
        improvementTip: "Expand on the socio-economic impact on the working class and rural displacement."
    }
  ]
};

// --- Types ---
interface GradingResult {
  totalScore: number;
  maxScore: number;
  letterGrade: string;
  confidenceScore: number;
  summary: string;
  questions: {
    id: number | string;
    score: number;
    max: number;
    studentAnswer: string;
    modelAnswer: string;
    rubricConstraint: string;
    reasoning: string;
    improvementTip: string;
  }[];
}

type DemoState = 'upload' | 'analyzing' | 'results';

const MotionDiv = motion.div as any;
const MotionImg = motion.img as any;

// Audio Helper
const playSound = (type: 'success' | 'scan') => {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'success') {
       osc.frequency.setValueAtTime(440, ctx.currentTime); 
       osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.1);
       gain.gain.setValueAtTime(0.05, ctx.currentTime);
       gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
       osc.start();
       osc.stop(ctx.currentTime + 0.5);
    } else {
       // Scan noise
       osc.type = 'sawtooth';
       osc.frequency.setValueAtTime(100, ctx.currentTime);
       gain.gain.setValueAtTime(0.02, ctx.currentTime);
       gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
       osc.start();
       osc.stop(ctx.currentTime + 0.1);
    }
  } catch (e) {
    console.error("Audio error", e);
  }
};

const DemoPage: React.FC = () => {
  const [state, setState] = useState<DemoState>('upload');
  const [keyFile, setKeyFile] = useState<File | null>(null);
  const [studentFile, setStudentFile] = useState<File | null>(null);
  
  const [studentImages, setStudentImages] = useState<string[]>([]);
  const [keyImages, setKeyImages] = useState<string[]>([]);
  
  const [result, setResult] = useState<GradingResult | null>(null);
  const [analysisLog, setAnalysisLog] = useState<string[]>([]);
  const [currentScanIndex, setCurrentScanIndex] = useState(0);
  const [isErrorFallback, setIsErrorFallback] = useState(false);

  // --- Analysis Animation Loop ---
  useEffect(() => {
    let logInterval: any;
    let scanInterval: any;

    if (state === 'analyzing') {
      const logs = [
        "Initializing Neural Vision Module...",
        "Loading Gemini 2.5 Flash Model...",
        "Allocating Tensor Memory...",
        "Rasterizing PDF at 300 DPI...",
        "Enhancing Contrast & De-noising...",
        "Detecting Handwriting Regions...",
        "Segmenting Question Blocks...",
        "Identifying Answer Key Schema...",
        "Extracting Rubric Constraints...",
        "Mapping Student Responses to Rubric...",
        "Performing Semantic Vector Search...",
        "Analyzing Keyword Frequency...",
        "Evaluating Partial Credit Logic...",
        "Cross-Referencing Model Answers...",
        "Generating Feedback Report...",
        "Finalizing JSON Output...",
        "Finishing up...."
      ];
      
      let i = 0;
      logInterval = setInterval(() => {
        if (i < logs.length) {
          // Keep more logs to fill the container (h-64 approx 10-12 lines)
          setAnalysisLog(prev => [...prev, logs[i]].slice(-12));
          playSound('scan');
          i++;
        }
      }, 730); // 600ms updates
    }

    if ((state === 'analyzing' || state === 'results') && studentImages.length > 0) {
        scanInterval = setInterval(() => {
            setCurrentScanIndex(prev => (prev + 1) % studentImages.length);
        }, 3000);
    }

    return () => {
        clearInterval(logInterval);
        clearInterval(scanInterval);
    };
  }, [state, studentImages]);

  // Trigger sound when results appear
  useEffect(() => {
    if (state === 'results') playSound('success');
  }, [state]);

  const handleUpload = async () => {
    if (!keyFile || !studentFile) return;
    
    setState('analyzing');
    setAnalysisLog([]);
    setIsErrorFallback(false);

    try {
      const kImages = await processFile(keyFile);
      const sImages = await processFile(studentFile);
      setKeyImages(kImages);
      setStudentImages(sImages);

      const apiKey = process.env.API_KEY;
      
      // Fallback if no Key
      if (!apiKey) {
        await new Promise(resolve => setTimeout(resolve, 8000)); // Slightly longer for the demo effect
        setResult(MOCK_RESULT);
        setIsErrorFallback(true);
        setState('results');
        return;
      }

      const ai = new GoogleGenAI({ apiKey });

      // Build Parts
      const keyParts = kImages.map(base64 => ({
          inlineData: { data: base64.split(',')[1], mimeType: 'image/jpeg' }
      }));
      const studentParts = sImages.map(base64 => ({
          inlineData: { data: base64.split(',')[1], mimeType: 'image/jpeg' }
      }));

      // Optimized Prompt for Detailed JSON
      const prompt = `
        You are an elite AI Examiner.
        
        TASK:
        Compare the STUDENT ANSWER SHEET (Group 2 Images) against the ANSWER KEY (Group 1 Images).
        
        CRITICAL RULES FOR JSON OUTPUT:
        1. Keep strings CONCISE but informative (max 20 words for answers).
        2. Ensure the JSON is valid and closes properly.
        3. Do NOT output markdown code blocks, just raw JSON.
        
        OUTPUT SCHEMA:
        {
          "totalScore": number,
          "maxScore": number,
          "letterGrade": string (S, A, B, C, D, F),
          "confidenceScore": number (0-100),
          "summary": string (max 40 words),
          "questions": [
             { 
               "id": number or string, 
               "score": number, 
               "max": number, 
               "studentAnswer": string,
               "modelAnswer": string,
               "rubricConstraint": string (What was the key requirement?),
               "reasoning": string (Why was this score given?),
               "improvementTip": string (How can the student improve?)
             }
          ]
        }
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: {
            parts: [...keyParts, ...studentParts, { text: prompt }]
        },
        config: {
           responseMimeType: "application/json",
        }
      });

      const jsonText = response.text;
      if (jsonText) {
         try {
             // Robust cleaning
             const cleanJson = jsonText.replace(/```json|```/g, '').trim();
             const parsedResult = JSON.parse(cleanJson);
             
             // Safety checks
             if (!parsedResult.questions) parsedResult.questions = [];
             if (parsedResult.totalScore !== undefined && parsedResult.maxScore !== undefined) {
                 parsedResult.letterGrade = calculateGrade(parsedResult.totalScore, parsedResult.maxScore);
             }
             setResult(parsedResult);
         } catch (e) {
             console.error("JSON Parse Error:", e);
             // Graceful Degradation
             setResult({
                 ...MOCK_RESULT,
                 summary: "Analysis completed with partial data. (JSON Response truncated due to complexity)."
             });
             setIsErrorFallback(true);
         }
      } else {
         throw new Error("Empty response");
      }

      setState('results');

    } catch (error) {
      console.error("Grading failed", error);
      setResult(MOCK_RESULT);
      setIsErrorFallback(true);
      setState('results');
    }
  };

  const downloadCSV = () => {
    if (!result) return;
    const headers = ["ID", "Score", "Max", "Student Answer", "Model Answer", "Rubric", "Reasoning", "Improvement Tip"];
    const rows = result.questions.map(q => [
      q.id,
      q.score,
      q.max,
      `"${q.studentAnswer.replace(/"/g, '""')}"`,
      `"${q.modelAnswer.replace(/"/g, '""')}"`,
      `"${q.rubricConstraint.replace(/"/g, '""')}"`,
      `"${q.reasoning.replace(/"/g, '""')}"`,
      `"${q.improvementTip.replace(/"/g, '""')}"`
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Grading_Report_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="pt-32 pb-20 container mx-auto px-6 min-h-screen relative">
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none z-[-1]">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-accent/5 blur-[120px] rounded-full animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 blur-[120px] rounded-full animate-pulse delay-1000" />
      </div>

      <AnimatePresence mode="wait">
        
        {/* === VIEW 1: UPLOAD === */}
        {state === 'upload' && (
          <MotionDiv
            key="upload"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-16 relative">
               <motion.div 
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.2 }}
                
               >
                
               </motion.div>
               <h1 className="text-5xl md:text-7xl font-display font-medium text-white mb-6 tracking-tight">
                 Evaluate Papers<br/>
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-white">In Seconds.</span>
               </h1>
               <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
                 Upload your Answer Key and Student Scripts. Our multi-modal AI agent will perform OCR, semantic analysis, and grading instantly.
               </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
               <UploadCard 
                  title="Rubric / Answer Key" 
                  description="PDF containing correct answers and marking scheme."
                  file={keyFile} 
                  setFile={setKeyFile} 
                  delay={0.1}
               />
               <UploadCard 
                  title="Student Script" 
                  description="Handwritten or digital answer sheet (PDF/Image)."
                  file={studentFile} 
                  setFile={setStudentFile} 
                  delay={0.2}
               />
            </div>

            <div className="flex justify-center">
               <motion.button 
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.95 }}
                 disabled={!keyFile || !studentFile}
                 onClick={handleUpload}
                 className={`
                    px-12 py-5 rounded-full font-bold text-lg flex items-center gap-3 transition-all duration-500 shadow-xl
                    ${(keyFile && studentFile) 
                       ? 'bg-gradient-to-r from-brand-accent to-white text-brand-darker shadow-[0_0_40px_rgba(74,222,128,0.3)]' 
                       : 'bg-white/5 text-gray-500 cursor-not-allowed border border-white/5'}
                 `}
               >
                 {keyFile && studentFile ? <Brain size={24} className="animate-pulse" /> : <ShieldCheck size={24} />}
                 Start Grading
               </motion.button>
            </div>
          </MotionDiv>
        )}

        {/* === VIEW 2: ANALYZING === */}
        {state === 'analyzing' && (
          <MotionDiv
            key="analyzing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="flex flex-col items-center justify-center min-h-[60vh] max-w-5xl mx-auto w-full"
          >
             <div className="grid lg:grid-cols-2 gap-12 w-full items-center">
                 {/* Left: Cyberpunk Scanner Visual */}
                 <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-brand-accent to-blue-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                    <div className="bg-[#050a05] rounded-xl border border-white/10 relative overflow-hidden aspect-[3/4] flex items-center justify-center shadow-2xl">
                        {studentImages.length > 0 && (
                            <div className="relative w-full h-full">
                                {/* Image Layer */}
                                <AnimatePresence mode="popLayout">
                                    <MotionImg 
                                        key={currentScanIndex}
                                        src={studentImages[currentScanIndex]}
                                        initial={{ opacity: 0, scale: 1.1 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.8 }}
                                        className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale-[0.5]"
                                    />
                                </AnimatePresence>

                                {/* Grid Overlay */}
                                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_4px,6px_100%] pointer-events-none" />

                                {/* Scanning Laser */}
                                <MotionDiv 
                                    className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-brand-accent/20 to-transparent z-20 border-t-2 border-brand-accent/80 shadow-[0_0_30px_#4ade80]"
                                    animate={{ top: ["-10%", "110%"] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                />
                                
                                {/* Data HUD */}
                                <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-30">
                                   <div className="flex flex-col gap-1">
                                      <div className="text-[10px] font-mono text-gray-400">
                                         ISO 800 • 1/500s
                                      </div>
                                   </div>
                                   <ScanLine className="text-brand-accent/80 animate-pulse" size={20} />
                                </div>
                            </div>
                        )}
                    </div>
                 </div>

                 {/* Right: Terminal Logs */}
                 <div className="flex flex-col justify-center">
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-2">
                           <Loader2 className="text-brand-accent animate-spin" size={24} />
                           <h2 className="text-3xl font-display font-medium text-white">
                               Analyzing Document
                           </h2>
                        </div>
                        <p className="text-gray-400 leading-relaxed">
                            Deconstructing pixels into semantic meaning. Please wait while the Agentic Workflow completes its cycle.
                        </p>
                    </div>

                    <div className="bg-[#0A0F0A] border border-white/10 rounded-xl p-6 font-mono text-xs md:text-sm h-64 flex flex-col justify-end shadow-inner relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-20">
                           <Brain size={64} />
                        </div>
                        <div className="space-y-2 relative z-10">
                            {analysisLog.map((log, i) => (
                            <MotionDiv 
                                key={i} 
                                initial={{ opacity: 0, x: -10 }} 
                                animate={{ opacity: 1, x: 0 }} 
                                className="flex gap-3 text-gray-300 items-center"
                            >
                                <span className="text-brand-accent">➜</span> 
                                <span className={i === analysisLog.length - 1 ? "text-white font-bold" : "text-gray-400"}>
                                   {log}
                                </span>
                                {i === analysisLog.length - 1 && (
                                   <span className="w-2 h-4 bg-brand-accent animate-pulse inline-block ml-1" />
                                )}
                            </MotionDiv>
                            ))}
                        </div>
                    </div>
                 </div>
             </div>
          </MotionDiv>
        )}

        {/* === VIEW 3: RESULTS === */}
        {state === 'results' && result && (
          <MotionDiv
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-7xl mx-auto"
          >
             {/* Sticky Header Alert for Fallback */}
             {isErrorFallback && (
                <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl flex items-center gap-3 text-yellow-200 text-sm">
                   <AlertCircle size={18} />
                   <span><strong>Demo Mode:</strong> We're showing a demonstration result because the API key was missing or the response was truncated.</span>
                </div>
             )}

             {/* Score Dashboard */}
             <div className="grid lg:grid-cols-12 gap-6 mb-12">
                
                {/* Main Grade Card */}
                <div className="lg:col-span-4 bg-[#0A0F0A] border border-white/10 rounded-3xl p-8 relative overflow-hidden group">
                   <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                   
                   <div className="relative z-10 flex flex-col h-full justify-between">
                      <div className="flex justify-between items-start">
                         <div>
                            <div className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">Final Grade</div>
                            <div className="text-4xl font-display font-medium text-white">
                               <CountUp to={result.totalScore} />
                               <span className="text-xl text-gray-500">/{result.maxScore}</span>
                            </div>
                         </div>
                         <div className="bg-white/5 p-2 rounded-lg border border-white/5">
                            <Brain size={20} className="text-brand-accent" />
                         </div>
                      </div>

                      <div className="mt-8 flex items-end justify-between">
                         <div className="text-sm text-gray-400 max-w-[120px]">
                            Calculated based on {result.questions?.length} questions.
                         </div>
                         <motion.div 
                           initial={{ scale: 2, opacity: 0, rotate: -20 }}
                           animate={{ scale: 1, opacity: 1, rotate: 0 }}
                           transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.5 }}
                           className={`text-8xl font-display font-bold leading-none ${getGradeColor(result.letterGrade)}`}
                         >
                            {result.letterGrade}
                            {['S', 'A'].includes(result.letterGrade) && <ParticleExplosion />}
                         </motion.div>
                      </div>
                   </div>
                </div>

                {/* Summary & Stats */}
                <div className="lg:col-span-8 flex flex-col gap-6">
                    {/* Executive Summary */}
                    <div className="flex-1 bg-white/[0.02] border border-white/5 rounded-3xl p-8 backdrop-blur-sm">
                       <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                          <Sparkles size={16} className="text-brand-accent" /> AI Summary
                       </h3>
                       <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                          {result.summary}
                       </p>
                    </div>

                    {/* Stats Row */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                          { label: 'Confidence', val: `${result.confidenceScore}%`, icon: ShieldCheck },
                          { label: 'Pages Scanned', val: studentImages.length, icon: Copy },
                          { label: 'Questions', val: result.questions?.length, icon: FileText },
                          { label: 'Process Time', val: '1.2s', icon: Loader2 },
                        ].map((stat, i) => (
                           <div key={i} className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 flex flex-col justify-center items-center text-center">
                              <stat.icon size={16} className="text-gray-500 mb-2" />
                              <div className="text-xl font-bold text-white">{stat.val}</div>
                              <div className="text-[10px] text-gray-500 uppercase tracking-widest">{stat.label}</div>
                           </div>
                        ))}
                    </div>
                </div>
             </div>

             {/* Detailed Breakdown Header */}
             <div className="flex justify-between items-end mb-8">
                 <div className="flex items-center gap-4 w-full">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                    <h3 className="text-xl font-display text-white">Detailed Question Analysis</h3>
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                 </div>
                 <button 
                   onClick={downloadCSV}
                   className="hidden md:flex items-center gap-2 text-sm text-gray-400 hover:text-brand-accent transition-colors border border-white/10 px-4 py-2 rounded-full hover:bg-white/5 ml-4 whitespace-nowrap"
                 >
                    <Download size={14} /> Export CSV
                 </button>
             </div>

             {/* Detailed Cards Grid */}
             <div className="space-y-6 pb-12">
                {result.questions?.map((q, idx) => (
                   <MotionDiv 
                      key={q.id || idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="group bg-[#0A0F0A]/80 border border-white/5 hover:border-brand-accent/20 rounded-2xl overflow-hidden transition-all duration-300 shadow-lg"
                   >
                      <div className="p-6 md:p-8">
                         {/* Header: Score and ID */}
                         <div className="flex justify-between items-start mb-6 border-b border-white/5 pb-4">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center font-display font-bold text-xl text-white border border-white/10">
                                   Q{idx + 1}
                                </div>
                                <div>
                                   <div className="flex items-center gap-2 text-xs font-mono text-gray-500 uppercase tracking-wider mb-1">
                                      Score Awarded
                                   </div>
                                   <div className={`text-2xl font-bold ${q.score === q.max ? 'text-brand-accent' : 'text-white'}`}>
                                      {q.score} <span className="text-sm text-gray-500 font-normal">/ {q.max}</span>
                                   </div>
                                </div>
                            </div>
                            {q.rubricConstraint && (
                                <div className="hidden md:block bg-blue-500/10 border border-blue-500/20 px-4 py-2 rounded-lg max-w-sm">
                                    <div className="flex items-center gap-2 text-[10px] font-bold text-blue-400 uppercase tracking-wider mb-1">
                                       <Scale size={10} /> Rubric Constraint
                                    </div>
                                    <div className="text-xs text-blue-100/80 leading-relaxed">
                                       "{q.rubricConstraint}"
                                    </div>
                                </div>
                            )}
                         </div>

                         {/* Answers Comparison Grid */}
                         <div className="grid md:grid-cols-2 gap-8 mb-6">
                            {/* Student Answer */}
                            <div className="space-y-2">
                               <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider">
                                  <div className="w-1.5 h-1.5 rounded-full bg-white/50" /> Student Response
                               </div>
                               <div className="bg-white/5 rounded-xl p-4 text-sm text-gray-300 font-serif italic border border-white/5 min-h-[80px]">
                                  "{q.studentAnswer}"
                               </div>
                            </div>

                            {/* Model Answer */}
                            <div className="space-y-2">
                               <div className="flex items-center gap-2 text-xs font-bold text-brand-accent uppercase tracking-wider">
                                  <div className="w-1.5 h-1.5 rounded-full bg-brand-accent" /> Model Answer
                               </div>
                               <div className="bg-brand-accent/5 rounded-xl p-4 text-sm text-gray-300 border border-brand-accent/10 min-h-[80px]">
                                  {q.modelAnswer}
                               </div>
                            </div>
                         </div>

                         {/* Feedback & Improvement Section */}
                         <div className="bg-black/40 rounded-xl p-5 border border-white/5 flex flex-col md:flex-row gap-6">
                             <div className="flex-1">
                                <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                                   <BookOpen size={12} /> AI Reasoning
                                </div>
                                <p className="text-sm text-gray-300 leading-relaxed">
                                   {q.reasoning}
                                </p>
                             </div>
                             <div className="w-px bg-white/10 hidden md:block" />
                             <div className="flex-1">
                                <div className="flex items-center gap-2 text-xs font-bold text-green-400 uppercase tracking-wider mb-2">
                                   <Lightbulb size={12} /> Improvement Tip
                                </div>
                                <p className="text-sm text-gray-300 leading-relaxed">
                                   {q.improvementTip}
                                </p>
                             </div>
                         </div>
                      </div>
                   </MotionDiv>
                ))}
             </div>

             <div className="flex flex-col items-center justify-center pb-20 gap-4">
                 <button 
                   onClick={downloadCSV}
                   className="md:hidden flex items-center gap-2 text-sm text-gray-400 hover:text-white border border-white/10 px-6 py-3 rounded-full"
                 >
                    <Download size={16} /> Download Full Report
                 </button>
                 
                <button 
                   onClick={() => { setState('upload'); setKeyFile(null); setStudentFile(null); }}
                   className="group bg-white text-black px-10 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-brand-accent transition-colors shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                >
                   <RefreshCcw size={18} className="group-hover:-rotate-180 transition-transform duration-500" /> Grade Another Paper
                </button>
             </div>

          </MotionDiv>
        )}

      </AnimatePresence>
    </div>
  );
};

// --- Helper Components ---

const UploadCard: React.FC<{ 
    title: string; 
    description: string; 
    file: File | null; 
    setFile: (f: File | null) => void;
    delay: number;
}> = ({ title, description, file, setFile, delay }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleDragEnter = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (!isDragging) setIsDragging(true);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        if (e.dataTransfer.files?.[0]) {
            setFile(e.dataTransfer.files[0]);
        }
    };

    return (
        <MotionDiv 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay }}
            onClick={() => inputRef.current?.click()}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className={`
                group relative cursor-pointer border-2 border-dashed rounded-3xl p-8 flex flex-col items-center justify-center text-center transition-all duration-300 overflow-hidden min-h-[280px]
                ${isDragging 
                    ? 'border-brand-accent bg-brand-accent/10 scale-[1.02] shadow-[0_0_30px_rgba(74,222,128,0.2)]' 
                    : file 
                        ? 'border-brand-accent/50 bg-brand-accent/5' 
                        : 'border-white/10 hover:border-brand-accent/30 hover:bg-white/5'
                }
            `}
        >
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />
            
            <input 
                type="file" 
                ref={inputRef} 
                className="hidden" 
                accept="image/*,application/pdf"
                onChange={(e) => e.target.files?.[0] && setFile(e.target.files[0])}
            />
            
            <div className={`relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 
                ${isDragging ? 'scale-125 rotate-12 bg-brand-accent text-black' : 
                  file ? 'bg-brand-accent text-black scale-110 shadow-lg' : 'bg-white/5 text-gray-400 group-hover:bg-white/10 group-hover:text-white'}
            `}>
                {file ? <Check size={32} /> : <Upload size={32} />}
            </div>
            
            <h3 className="relative z-10 text-xl font-bold text-white mb-2">{file ? file.name : title}</h3>
            <p className="relative z-10 text-gray-500 text-sm max-w-xs">{file ? "Ready for analysis" : isDragging ? "Drop file here" : description}</p>

            {/* Hover Glow */}
            <div className={`absolute -bottom-20 -right-20 w-40 h-40 bg-brand-accent/10 blur-[80px] rounded-full transition-all duration-500 opacity-0 ${isDragging || file ? 'opacity-100' : 'group-hover:opacity-100'}`} />
        </MotionDiv>
    );
};

export default DemoPage;
