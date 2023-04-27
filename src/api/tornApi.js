export async function fetchFactionMembers(apiKey) {
    const apiUrl = `https://api.torn.com/faction/?selections=basic&key=${apiKey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
  
    if (data.error) {
      throw new Error(data.error);
    }
  
    const members = Object.values(data.members).map((member) => ({
      ID: member.ID,
      name: member.name,
      status: {
        state: member.status.state,
        until: member.status.until,
      },
    }));
  
    return members;
  }
  
  