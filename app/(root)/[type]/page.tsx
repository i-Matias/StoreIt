import Card from "@/components/Card";
import Sort from "@/components/Sort";
import { Button } from "@/components/ui/button";
import { deleteAllFiles, getFiles } from "@/lib/actions/file.actions";
import { convertFileSize, getFileTypesParams } from "@/lib/utils";
import { FileType, SearchParamProps } from "@/types";
import { Models } from "node-appwrite";
import { useState } from "react";

const Page = async ({ searchParams, params }: SearchParamProps) => {
  const type = ((await params)?.type as string) || "";
  const searchText = ((await searchParams)?.search as string) || "";
  const sort = ((await searchParams)?.sort as string) || "";

  const types = getFileTypesParams(type) as FileType[];
  const files = await getFiles({ types, searchText, sort });
  const total = files.documents.reduce(
    (acc: any, curr: any) => acc + curr.size,
    0,
  );

  return (
    <div className="page-container">
      <section className="w-full">
        <h1 className="h1 capitalize">{type}</h1>

        <div className="total-size-section">
          <div className="flex-center gap-4">
            <p className="body-1">
              Total: <span className="h5">{convertFileSize(total)}</span>
            </p>
            <form
              action={async () => {
                "use server";
                const fileIds = files.documents.map(
                  (file: Models.Document) => file.$id,
                );

                const deletedFiles = await deleteAllFiles({
                  fileIds,
                  path: type,
                });
              }}
            >
              <Button
                className="primary-btn"
                disabled={files.documents.length === 0}
              >
                Delete all
              </Button>
            </form>
          </div>

          <div className="sort-container">
            <p className="body-1 hidden text-light-200 sm:block">Sort by:</p>
            <Sort />
          </div>
        </div>
      </section>
      {files.total > 0 ? (
        <section className="file-list">
          {files.documents.map((file: Models.Document) => (
            <Card key={file.$id} file={file} />
          ))}
        </section>
      ) : (
        <p className="empty-list">No files uploaded</p>
      )}
    </div>
  );
};

export default Page;
