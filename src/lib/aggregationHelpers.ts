import { PipelineStage } from "mongoose";

interface IAggregationOptions {
  searchFields?: string[];
  filters?: Record<string, any>;
  sortFields?: Record<string, 1 | -1>;
  page?: number;
  limit?: number;
}

export const buildAggregationPipeline = (
  query: Record<string, any>,
  options: IAggregationOptions
): PipelineStage[] => {
  const pipeline: PipelineStage[] = [];

  // ================= BASE FILTER =================
  if (options.filters) {
    pipeline.push({ $match: options.filters });
  }

  // ================= SEARCH =================
  if (query.search && options.searchFields?.length) {
    const regex = new RegExp(query.search, "i");
    pipeline.push({
      $match: {
        $or: options.searchFields.map((field) => ({
          [field]: { $regex: regex },
        })),
      },
    });
  }

  // ================= DYNAMIC SORT =================
  let sortStage: Record<string, 1 | -1> = { createdAt: -1 }; // default newest first
  if (query.sort) {
    if (query.sort === "az") sortStage = { productName: 1 };
    else if (query.sort === "za") sortStage = { productName: -1 };
    else if (query.sort === "new") sortStage = { createdAt: -1 };
    else if (query.sort === "old") sortStage = { createdAt: 1 };
  }
  pipeline.push({ $sort: sortStage });

  // ================= PAGINATION =================
  const page = Number(query.page) || options.page || 1;
  const limit = Number(query.limit) || options.limit || 10;
  const skip = (page - 1) * limit;

  pipeline.push({ $skip: skip });
  pipeline.push({ $limit: limit });

  return pipeline;
};
