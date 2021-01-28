export class ValidationMsgUtils {
  // Begin string type
  public static buildStringBaseMsg(name: string): string {
    return `${name} must be a string`;
  }

  public static buildStringEmptyMsg(name: string): string {
    return `Please enter your ${name}`;
  }

  public static buildStringEmailMsg(name: string): string {
    return `${name} should follow this fomat: name@domain`;
  }

  public static buildStringMinMsg(name: string): string {
    return `${name} must be at least {#limit} characters long`;
  }

  public static buildStringMaxMsg(name: string): string {
    return `${name} must be at most {#limit} characters long`;
  }

  public static buildStringLengthMsg(name: string): string {
    return `${name} must be {#limit} characters long`;
  }

  public static buildStrPatternMsg(name: string, pattern: string): string {
    return `${name} must follow this pattern: ${pattern}`;
  }
  // End string type

  // Begin Object type
  public static buildObjectBaseMsg(name: string = "The request"): string {
    return `${name} should be an object`;
  }

  public static buildUnknownFieldsMsg(): string {
    return "{#child} is not unexpected";
  }
  // End Object type

  // Begin any type
  public static buildAnyRequiredMsg(name: string): string {
    return `${name} is required`;
  }
  // End any type
}
