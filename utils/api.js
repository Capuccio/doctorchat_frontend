const BASE_API = "http://192.168.43.223:5000/";

class Api {
  createHeader(data) {
    let header = {
      method: data.method,
      body: JSON.stringify(data.body),
      headers: {
        "Content-Type": "application/json"
      }
    };
    return header;
  }

  async register(userData) {
    const ans = await fetch(
      `${BASE_API}register`,
      this.createHeader({ method: "POST", body: userData })
    );
    const answer = await ans.json();
    return answer;
  }

  async login(userData) {
    const ans = await fetch(
      `${BASE_API}login`,
      this.createHeader({ method: "POST", body: userData })
    );
    const answer = await ans.json();
    return answer;
  }

  async userList() {
    const ans = await fetch(`${BASE_API}userlist`);
    const answer = await ans.json();
    return answer;
  }

  async getUserData(idUser) {
    const ans = await fetch(`${BASE_API}userdata/${idUser}`);
    const answer = await ans.json();
    return answer;
  }

  async getDoctorList() {
    const ans = await fetch(`${BASE_API}doctorlist`);
    const answer = await ans.json();
    return answer;
  }

  async getDoctor(myId) {
    const ans = await fetch(`${BASE_API}mydoctor/${myId}`);
    const answer = await ans.json();
    return answer;
  }

  async getChat(idPatient) {
    const ans = await fetch(`${BASE_API}chat/${idPatient}`);
    const answer = await ans.json();
    return answer;
  }
}

export default new Api();
