import React, { useState } from 'react';

const App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [story, setStory] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const openWeatherMapApiKey = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;
  const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY;

  const fetchWeatherAndStory = async () => {
    if (!city) {
      setError('Please enter a city name.');
      return;
    }

    setLoading(true);
    setError(null);
    setWeatherData(null);
    setStory('');

    try {
      // Fetch weather data
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${openWeatherMapApiKey}&units=metric`
      );

      if (!weatherResponse.ok) {
        throw new Error('City not found or API key is invalid.');
      }

      const weatherJson = await weatherResponse.json();
      setWeatherData(weatherJson);

      // Generate weather story
      const storyPrompt = `Create a short, creative, and evocative weather story for ${city}. 
        Current weather: ${weatherJson.list[0].weather[0].description}, temperature: ${weatherJson.list[0].main.temp}°C, 
        wind: ${weatherJson.list[0].wind.speed} m/s, humidity: ${weatherJson.list[0].main.humidity}%. 
        The 5-day forecast includes: ${weatherJson.list.map(item => item.weather[0].description).join(', ')}. 
        Interpret these conditions in an imaginative way, going beyond a simple factual report.`;

      const geminiResponse = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${geminiApiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{ parts: [{ text: storyPrompt }] }],
          }),
        }
      );

      if (!geminiResponse.ok) {
        throw new Error('Failed to generate weather story.');
      }

      const geminiJson = await geminiResponse.json();
      const generatedStory = geminiJson.candidates[0].content.parts[0].text;
      setStory(generatedStory);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
      <div className="bg-white w-full max-w-md md:max-w-lg lg:max-w-2xl rounded-lg shadow-lg p-6 sm:p-8 lg:p-10 border border-gray-200">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-6 tracking-tight">
          Weather Storyteller
        </h1>
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter a city name..."
            className="flex-grow p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
          />
          <button
            onClick={fetchWeatherAndStory}
            className="bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 text-base font-semibold"
            disabled={loading}
          >
            {loading ? 'Generating...' : 'Get Weather Story'}
          </button>
        </div>

        {loading && (
          <div className="text-center text-blue-600 text-lg font-medium animate-pulse mb-4">
            Fetching weather and crafting story...
          </div>
        )}
        {error && (
          <div className="text-center text-red-600 bg-red-50 border border-red-200 rounded-md p-3 mb-4 text-base font-medium">
            Error: {error}
          </div>
        )}

        {weatherData && (
          <div className="mt-6 bg-white rounded-lg p-5 shadow-sm border border-gray-200 mb-6">
            <div className="text-center mb-4">
              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-1">{weatherData.city.name}</h2>
              <p className="text-lg text-gray-600 capitalize mb-2">
                {weatherData.list[0].weather[0].description}
              </p>
              <p className="text-5xl sm:text-6xl font-bold text-gray-900 mt-3">
                {Math.round(weatherData.list[0].main.temp)}°C
              </p>
              <div className="flex justify-center gap-5 mt-4 text-gray-700 text-base">
                <span>Wind: {weatherData.list[0].wind.speed} m/s</span>
                <span>Humidity: {weatherData.list[0].main.humidity}%</span>
              </div>
            </div>
          </div>
        )}

        {story && (
          <div className="mt-6 p-5 bg-white rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Atmospheric Description</h3>
            <p className="text-gray-700 leading-relaxed text-base whitespace-pre-wrap">
              {story}
            </p>
          </div>
        )}
      </div>
      <div className="mt-6 text-xs text-gray-500 text-center max-w-md leading-relaxed">
        <p>
          Remember to replace <code className="font-mono bg-gray-200 p-1 rounded">'YOUR_OPENWEATHERMAP_API_KEY'</code> and <code className="font-mono bg-gray-200 p-1 rounded">'YOUR_GEMINI_API_KEY'</code> in the <code className="font-mono bg-gray-200 p-1 rounded">App.jsx</code> file with your actual API keys.
        </p>
      </div>
    </div>
  );
};

export default App;