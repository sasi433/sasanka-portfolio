import type { EducationItem, LanguageItem } from "@/content/types";

export const educationItems = [
  {
    degree: "M.Sc. Electrical Engineering — Signal Processing",
    institution: "Blekinge Institute of Technology (BTH)",
    location: "Sweden",
    dates: "2015–2020",
    thesis: {
      title: "Development of a Multi Sensor Android Application",
      description:
        "Developed two native Android applications using Java, XML and the Android SDK. One detected available smartphone sensors and visualised their measurements; the other used calibrated proximity and accelerometer input for lock-screen interaction. Both were tested with Genymotion and physical Android devices, producing the expected sensor outputs, graphs and lock-screen behaviour.",
      technologies: [
        "Java",
        "Android SDK",
        "Android Studio",
        "XML",
        "Smartphone sensors",
        "Accelerometer",
        "Proximity sensor",
        "Sensor visualisation",
        "Genymotion",
        "Device testing",
      ],
    },
  },
  {
    degree: "B.Tech. Electronics and Communication Engineering",
    institution: "Jawaharlal Nehru Technological University, Kakinada",
    location: "India",
    dates: "2011–2015",
    thesis: {
      title: "Channel Estimation of OFDM by LS and MMSE Methods",
      description:
        "Implemented and simulated OFDM channel-estimation techniques in MATLAB, comparing LS and MMSE estimators under fading and noisy wireless-channel conditions. Evaluation used MSE and BER/SER across SNR levels: MMSE produced lower estimation and error rates, while LS offered substantially lower complexity and hardware requirements and remained suitable at higher SNR.",
      technologies: [
        "MATLAB",
        "OFDM",
        "Wireless communications",
        "Channel estimation",
        "LS and MMSE",
        "BPSK",
        "Rayleigh fading",
        "SNR",
        "MSE",
        "BER / SER",
        "Signal processing",
      ],
    },
  },
] satisfies readonly EducationItem[];

export const languageItems = [
  { language: "English", proficiency: "Professional working proficiency" },
  { language: "Telugu", proficiency: "Native" },
  { language: "Hindi", proficiency: "Professional working proficiency" },
  { language: "Swedish", proficiency: "Basic proficiency" },
] satisfies readonly LanguageItem[];
