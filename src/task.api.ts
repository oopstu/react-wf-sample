export interface ITaskApiConfig {
    baseUrl: string,
    userId: string,
    userPwd: string
}

export class TaskApi {
    static get defaultConfig() {
        return {
            baseUrl: "http://localhost/decisions",
            userId: "admin@decisions.com",
            userPwd: "admin"
        }
    }
    
    public static login(config: ITaskApiConfig = TaskApi.defaultConfig) {
        return new Promise<string>((resolve, reject) => {
            fetch(`${config.baseUrl}/Primary/REST/AccountService/LoginUser?userid=${config.userId}&password=${config.userPwd}&outputType=JSON`)
            .then(response => {
                return response.json().then(json => resolve(json.LoginUserResult.SessionValue));
            });
        });
    }

    public static fetchCurrent(sessionId: string, config: ITaskApiConfig = TaskApi.defaultConfig) {
        return new Promise<any>((resolve, reject) => {
            fetch(`${config.baseUrl}/Primary/REST/Assignment/GetMyCurrentAssignments?sessionId=${sessionId}&outputType=JSON`)
            .then(response => {
                return response.json().then(json => {
                    resolve(json.GetMyCurrentAssignmentsResult);
                });
            });
        }); 
    }
}