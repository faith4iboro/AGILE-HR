import { FileText, FolderClosed, Upload } from "lucide-react";

import { PageHeader } from "@/components/shared/page-header";
import { DashboardBreadcrumb } from "@/components/shared/dashboard-breadcrumb";
import { StatCard } from "@/components/shared/stat-card";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StaggerGroup, StaggerItem, FadeIn } from "@/components/motion/fade-in";
import { DUMMY_DOCUMENTS } from "@/constants/dummy-data";
import { formatDate } from "@/lib/utils";

export const metadata = {
  title: "Documents — AuraHR",
};

export default function DocumentsPage() {
  const hasDocuments = DUMMY_DOCUMENTS.length > 0;

  return (
    <div className="flex flex-col gap-7">
      <PageHeader
        breadcrumb={<DashboardBreadcrumb items={[{ label: "Documents" }]} />}
        eyebrow="Operations"
        title="Documents"
        description="A single home for policies, contracts, certificates, and HR forms."
        actions={
          <Button size="sm">
            <Upload />
            Upload document
          </Button>
        }
      />

      <StaggerGroup className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StaggerItem>
          <StatCard
            label="Total Documents"
            value="128"
            icon={FolderClosed}
            tone="primary"
          />
        </StaggerItem>
        <StaggerItem>
          <StatCard label="Policies" value="24" icon={FileText} tone="secondary" />
        </StaggerItem>
        <StaggerItem>
          <StatCard label="Expiring Soon" value="3" icon={FileText} tone="warning" />
        </StaggerItem>
      </StaggerGroup>

      {hasDocuments ? (
        <FadeIn>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Document</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Uploaded by</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Size</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {DUMMY_DOCUMENTS.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell className="flex items-center gap-2.5 font-medium">
                    <FileText className="text-muted-foreground size-4" /> {doc.name}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{doc.category}</Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {doc.uploadedBy}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatDate(doc.uploadedAt)}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {(doc.sizeKb / 1024).toFixed(1)} MB
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </FadeIn>
      ) : (
        <EmptyState
          icon={FolderClosed}
          title="No documents uploaded yet"
          description="Upload employee contracts, company policies, and forms to keep everything organized."
        />
      )}
    </div>
  );
}
