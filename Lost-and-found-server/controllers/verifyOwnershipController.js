require("dotenv").config();
const axios = require("axios");

console.log("Gemini API Key:", process.env.GEMINI_API_KEY); // This will log your API key from the .env file

const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

const verifyOwnership = async (req, res) => {
  const { color, description, answer1, answer2 } = req.body;

  try {
    console.log("Received data:", { color, description, answer1, answer2 });

    const colorSimilarity = await calculateGeminiSimilarity(answer1, color);

    let descriptionSimilarity = 1;
    if (description.trim() !== "") {
      descriptionSimilarity = await calculateGeminiSimilarity(
        answer2,
        description
      );
    }

    console.log("Color Similarity:", colorSimilarity);
    console.log("Description Similarity:", descriptionSimilarity);

    // Determine success based on threshold
    const success =
      colorSimilarity >= 0.8 &&
      (description.trim() === "" || descriptionSimilarity >= 0.5);

    return res.status(200).json({
      success,
      message: success
        ? "Verification successful"
        : "Verification failed. Try again.",
      color_similarity_score: colorSimilarity,
      description_similarity_score: descriptionSimilarity,
    });
  } catch (error) {
    console.error("Error during verification:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error verifying. Please try again." });
  }
};

// Function to calculate text similarity using Gemini API
const calculateGeminiSimilarity = async (text1, text2) => {
  try {
    const response = await axios.post(
      `${GEMINI_API_URL}?key=${process.env.GEMINI_API_KEY}`, // Use the GEMINI_API_KEY from the .env file
      {
        contents: [
          {
            parts: [
              {
                text: `Compare the following two texts based on their meaning and relevance to a lost and found verification system. Text 1 represents the user's claim, and Text 2 represents the description provided in the found post. Provide a similarity score between 0 and 1, where 1 means the texts are highly similar and 0 means they are completely different. Only return the similarity score as a number. Text 1: "${text1}"  Text 2: "${text2}"`,
              },
            ],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const similarityScore =
      parseFloat(response.data?.candidates?.[0]?.content?.parts?.[0]?.text) ||
      0;
    return similarityScore;
  } catch (error) {
    console.error("Error calculating Gemini similarity:", error);
    return 0;
  }
};

module.exports = { verifyOwnership };
