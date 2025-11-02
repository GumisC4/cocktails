import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination.tsx";
import type { Meta } from "@/types.ts";

interface DynamicPaginationProps {
  meta: Meta;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export function DynamicPagination({
  meta,
  currentPage,
  onPageChange,
}: DynamicPaginationProps) {
  const totalPages = meta.lastPage;

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      for (let index = 1; index <= totalPages; index++) {
        pages.push(index);
      }
    } else {
      pages.push(1);
      if (currentPage > 3) {
        pages.push("...");
      }
      for (let index = currentPage - 1; index <= currentPage + 1; index++) {
        if (index > 1 && index < totalPages) {
          pages.push(index);
        }
      }
      if (currentPage < totalPages - 2) {
        pages.push("...");
      }
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            isActive={currentPage !== 1}
            onClick={() => {
              onPageChange(Math.max(currentPage - 1, 1));
            }}
          />
        </PaginationItem>

        {getPageNumbers().map((p) => (
          <PaginationItem key={p}>
            {typeof p === "number" ? (
              <PaginationLink
                href="#"
                onClick={() => {
                  onPageChange(p);
                }}
                className={p === currentPage ? "font-bold" : ""}
              >
                {p}
              </PaginationLink>
            ) : (
              <PaginationEllipsis />
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            isActive={currentPage !== totalPages}
            onClick={() => {
              onPageChange(Math.min(currentPage + 1, totalPages));
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
