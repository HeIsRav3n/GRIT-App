// Motivational gym quotes for GRIT app
export const quotes = [
    "Small Steps. Heavy Results.",
    "Discipline Beats Motivation.",
    "One More Rep For The Future You.",
    "No Pain, No Gain.",
    "Train Insane Or Remain The Same.",
    "Your Only Limit Is You.",
    "Sweat Now, Shine Later.",
    "Stronger Every Day.",
    "Push Yourself Because No One Else Will.",
    "Great Things Never Come From Comfort Zones.",
    "The Only Bad Workout Is The One That Didn't Happen.",
    "Strive For Progress, Not Perfection.",
    "Your Body Can Stand Almost Anything. It's Your Mind You Have To Convince.",
    "Don't Wish For It, Work For It.",
    "Success Starts With Self-Discipline.",
    "Make Yourself Proud.",
    "The Pain You Feel Today Will Be The Strength You Feel Tomorrow.",
    "Excuses Don't Burn Calories.",
    "Fitness Is Not About Being Better Than Someone Else. It's About Being Better Than You Used To Be.",
    "Wake Up. Work Out. Look Hot. Kick Ass.",
];

// Get quote of the day based on date
export const getQuoteOfTheDay = () => {
    const dayOfYear = Math.floor(
        (new Date() - new Date(new Date().getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24
    );
    return quotes[dayOfYear % quotes.length];
};

// Get random quote
export const getRandomQuote = () => {
    return quotes[Math.floor(Math.random() * quotes.length)];
};
