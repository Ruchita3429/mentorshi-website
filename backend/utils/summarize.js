/**
 * Summarize text using Google Gemini API
 * @param {string} text - Text to summarize
 * @returns {Promise<string>} - Summary in 3-6 bullet points, under 120 words
 */
const summarizeText = async (text) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not set');
    }

    const model =
      process.env.GEMINI_MODEL || 'gemini-1.5-flash-latest';
    const apiVersion =
      process.env.GEMINI_API_VERSION || 'v1beta';

    const url = `https://generativelanguage.googleapis.com/${apiVersion}/models/${model}:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text:
                    'You are a helpful assistant that summarizes text into 3-6 concise bullet points under 120 words total. ' +
                    'Use bullet point format with • prefix.\n\nText to summarize:\n\n' +
                    text
                }
              ]
            }
          ]
        })
      }
    );

    if (!response.ok) {
      const errorBody = await response.text();
      console.error('Gemini API HTTP error:', response.status, errorBody);
      throw new Error('Failed to generate summary');
    }

    const data = await response.json();
    const summary =
      data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
      'No summary generated.';

    return summary;
  } catch (error) {
    console.error('Gemini API Error:', error.message);
    throw new Error('Failed to generate summary');
  }
};

module.exports = {
  summarizeText
};
