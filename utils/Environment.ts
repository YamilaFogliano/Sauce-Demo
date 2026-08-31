export class Environment {

    static readonly SD_PASSWORD = Environment.getRequired('SD_PASSWORD')
    static readonly STANDARD_USERNAME = Environment.getRequired('STANDARD_USERNAME')
    static readonly LOCKOUT_USERNAME = Environment.getRequired('LOCKOUT_USERNAME')
    static readonly PROBLEM_USERNAME = Environment.getRequired('PROBLEM_USERNAME')
    static readonly PERFORMANCE_GLITCH_USERNAME = Environment.getRequired('PERFORMANCE_GLITCH_USERNAME')
    static readonly ERROR_USERNAME = Environment.getRequired('ERROR_USERNAME')
    static readonly VISUAL_USERNAME = Environment.getRequired('VISUAL_USERNAME')

    private static getRequired(key: string): string {
        const value = process.env[key]

        if (!value) {
            throw new Error('Environment variable ' + key + 'does not exist')
        }

        return value

    }
}