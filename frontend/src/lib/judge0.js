import axios from "axios";

const JUDGE0_API = import.meta.env.VITE_JUDGE0_API;

const LANGUAGE_IDS = {
  javascript: 63,
  python: 71,
  java: 62,
};

export async function executeCode(language, code) {
  try {
    const languageId = LANGUAGE_IDS[language];

    if (!languageId) {
      return {
        success: false,
        error: `Unsupported language: ${language}`,
      };
    }

    let finalCode = code;

    // Convert LeetCode Java → Judge0 Java
    if (language === "java") {
      finalCode = code.replace(
        /class\s+Solution/g,
        "public class Main"
      );
    }

    const response = await axios.post(
      `${JUDGE0_API}/submissions?wait=true`,
      {
        source_code: finalCode,
        language_id: languageId,
      }
    );

    const data = response.data;

    const output =
      data.stdout ||
      data.compile_output ||
      data.stderr ||
      data.message ||
      "";

    const isSuccess =
      data.status?.description === "Accepted";

    return {
      success: isSuccess,
      output: output || "No output",
      error: isSuccess ? "" : output,
    };

  } catch (error) {
    return {
      success: false,
      error:
        error.response?.data?.message ||
        error.message ||
        "Execution failed",
    };
  }
}