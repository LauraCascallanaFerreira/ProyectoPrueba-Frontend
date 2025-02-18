export const fetchAPI = async (endPoint: string, options = {}) => {
    try {
      const response = await fetch(endPoint, options);
  
      if (response.status == 401) {
        window.location.href = "/login";
        throw new Error("Sesión expirada. Inicia sesión nuevamente");
      }
  
      const jsonData = await response.json();
      if (!response.ok) {
        if (jsonData.error) {
          throw jsonData.error;
        } else if (jsonData.message) {
          throw jsonData.message;
        } else {
          throw { error: jsonData };
        }
      }
  
      return jsonData;
    } catch (error) {
      console.error("error:", error);
      throw error;
    }
  };