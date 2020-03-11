const BASE_API = "https://doctorchat-backend.herokuapp.com/";

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

  async patientsList(myId) {
    const ans = await fetch(`${BASE_API}patientslist/${myId}`);
    const answer = await ans.json();
    return answer;
  }

  async getUserData(idUser) {
    const ans = await fetch(`${BASE_API}userdata/${idUser}`);
    const answer = await ans.json();
    return answer;
  }

  async getDoctorList(status) {
    const ans = await fetch(`${BASE_API}doctorlist/${status}`);
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

  async unlockPatient(idPatient) {
    const ans = await fetch(
      `${BASE_API}unlockuser`,
      this.createHeader({ method: "POST", body: idPatient })
    );
    const answer = await ans.json();
    return answer;
  }

  async updateData(data) {
    const ans = await fetch(
      `${BASE_API}updatedata`,
      this.createHeader({ method: "PUT", body: data })
    );
    const answer = await ans.json();
    return answer;
  }

  async acceptDoctor(data) {
    const ans = await fetch(
      `${BASE_API}acceptdoctor`,
      this.createHeader({ method: "PUT", body: data })
    );
    const answer = await ans.json();
    return answer;
  }
}

export default new Api();
