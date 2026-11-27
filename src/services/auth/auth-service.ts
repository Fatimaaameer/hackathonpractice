export type SignInInput = {
  email: string;
  password: string;
};

export type SignUpInput = {
  fullName: string;
  email: string;
  password: string;
};

export type DeveloperSignUpInput = SignUpInput & {
  organization: string;
};

export class AuthenticationUnavailableError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthenticationUnavailableError";
  }
}

export interface AuthService {
  signIn(input: SignInInput): Promise<void>;
  signUp(input: SignUpInput): Promise<void>;
  createDeveloperAccount(input: DeveloperSignUpInput): Promise<void>;
}

async function signInUnavailable(): Promise<never> {
  throw new AuthenticationUnavailableError(
    "Authentication is not configured in this demo. No sign-in was performed.",
  );
}

async function registrationUnavailable(): Promise<never> {
  throw new AuthenticationUnavailableError(
    "Account creation is not configured in this demo. No account was created and no credentials were sent.",
  );
}

export const authService: AuthService = {
  signIn: signInUnavailable,
  signUp: registrationUnavailable,
  createDeveloperAccount: registrationUnavailable,
};
