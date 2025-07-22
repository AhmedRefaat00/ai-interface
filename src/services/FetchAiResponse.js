export async function fetchAIResponse(messages) {
    async function makeRequest() {
        const payload = {
            model: "accounts/fireworks/models/kimi-k2-instruct",
            messages: messages,
        };
        console.log('Payload being sent to Fireworks API:', payload);
        const res = await fetch('https://api.fireworks.ai/inference/v1/chat/completions', {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer fw_3ZZT7Dso5SsqxuWxjbQyXGsz"
            },
            body: JSON.stringify(payload)
        });
        return res;
    }

    try {
        let res = await makeRequest();
        if (res.status === 400) {
            // Retry once if bad request
            res = await makeRequest();
        }
        if (!res.ok) {
            return 'Sorry, there was an error.';
        }
        const data = await res.json();
        console.log(data.choices[0].message.content);
        return data.choices[0].message.content || 'Sorry, there was an error.';
    } catch {
        return 'Sorry, there was an error.';
    }
}

const fetchImage = async (prompt) => {
    const response = await fetch("https://api.fireworks.ai/inference/v1/workflows/accounts/fireworks/models/flux-kontext-pro", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Bearer fw_3ZZT7Dso5SsqxuWxjbQyXGsz"
        },
        body: JSON.stringify({
            prompt: prompt
        }),
    });

    const result = await response.json();
    console.log(result);
    const requestId = result.request_id;

    // Optional: Wait a bit before polling
    await new Promise(res => setTimeout(res, 1500));

    // Step 2: Poll for the result
    const resultEndpoint = "https://api.fireworks.ai/inference/v1/workflows/accounts/fireworks/models/flux-kontext-pro/get_result";


    const resultResponse = await fetch(resultEndpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "image/jpeg",
            "Authorization": "Bearer fw_3ZZT7Dso5SsqxuWxjbQyXGsz"

        },
        body: JSON.stringify({ id: requestId })
    });

    const pollResult = await resultResponse.json();
    console.log(pollResult);
    return pollResult;


}

export default fetchImage;

