const fetch = require("node-fetch");
const { execSync } = require('child_process');

(async () => {
  try {
    const commits = execSync('git log --pretty=format:"%h %s" -n 10').toString();
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      console.log('--- RELEASE NOTES ---');
      console.log('Demo release notes:');
      console.log('- Feature: Initial app');
      console.log('- Fix: none (demo)');
      console.log('- Note: No LLM key configured');
      return;
    }

    const prompt = Generate concise release notes from these commits:\n\n${commits}\n\nWrite short highlights and a bullet list.;

    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: Bearer ${apiKey},
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 300
      })
    });

    const json = await res.json();
    console.log('--- RELEASE NOTES (AI) ---');
    console.log(json.choices?.[0]?.message?.content || JSON.stringify(json));
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
