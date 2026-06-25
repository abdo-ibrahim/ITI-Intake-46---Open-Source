import DataLoader from "dataloader";
import { Company, User } from "../database/models.js";

export const createCompanyLoader = () =>
  new DataLoader(async (companyIds) => {
    const companies = await Company.find({ _id: { $in: companyIds } });
    return companyIds.map((id) => companies.find((company) => company._id.toString() === id.toString()));
  });

export const createUsersByCompanyLoader = () =>
  new DataLoader(async (companyIds) => {
    const users = await User.find({ companies: { $in: companyIds } });

    return companyIds.map((companyId) => {
      const currentCompany = companyId.toString();

      return users.filter((user) => {
        const userCompaniesStrings = user.companies.map((id) => id.toString());
        return userCompaniesStrings.includes(currentCompany);
      });
    });
  });
