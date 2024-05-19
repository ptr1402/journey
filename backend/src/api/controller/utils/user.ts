import { getUserByIdDb } from "../../database/queries/user/user";
import { SelectUser } from "../../database/schema";

export async function validUser(userId: SelectUser["id"]): Promise<string[]> {
  const errors: string[] = [];

  if (!userId || isNaN(userId)) {
    errors.push("Invalid userId");
  } else {
    const user = await getUserByIdDb(userId);
    if (!user || user.length === 0) {
      errors.push(`User with userId=${userId} not found.`);
    }
  }

  return errors;
}
