import { Bell, Building, Lock, UserRound } from "lucide-react";

import { PageHeader } from "@/components/shared/page-header";
import { DashboardBreadcrumb } from "@/components/shared/dashboard-breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { FadeIn } from "@/components/motion/fade-in";

export const metadata = {
  title: "Settings — AuraHR",
};

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-7">
      <PageHeader
        breadcrumb={<DashboardBreadcrumb items={[{ label: "Settings" }]} />}
        eyebrow="Overview"
        title="Settings"
        description="Manage your profile, organization, and workspace preferences."
      />

      <FadeIn>
        <Tabs defaultValue="profile">
          <TabsList>
            <TabsTrigger value="profile">
              <UserRound /> Profile
            </TabsTrigger>
            <TabsTrigger value="organization">
              <Building /> Organization
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Bell /> Notifications
            </TabsTrigger>
            <TabsTrigger value="security">
              <Lock /> Security
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card className="p-0">
              <CardHeader className="px-6 pt-6">
                <CardTitle>Personal information</CardTitle>
                <CardDescription>
                  Update your name, email, and contact details.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-5 px-6 pb-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="firstName">First name</Label>
                    <Input id="firstName" defaultValue="Amaka" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="lastName">Last name</Label>
                    <Input id="lastName" defaultValue="Obiora" />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="email">Email address</Label>
                  <Input id="email" type="email" defaultValue="amaka.obiora@aurahr.com" />
                </div>
                <Separator />
                <div className="flex justify-end gap-2.5">
                  <Button variant="outline">Cancel</Button>
                  <Button>Save changes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="organization">
            <Card className="p-0">
              <CardHeader className="px-6 pt-6">
                <CardTitle>Organization details</CardTitle>
                <CardDescription>
                  Information shown across payslips and reports.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-5 px-6 pb-6">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="orgName">Organization name</Label>
                  <Input id="orgName" defaultValue="AuraHR Demo Workspace" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="orgAddress">Registered address</Label>
                  <Input id="orgAddress" defaultValue="12 Admiralty Way, Lekki, Lagos" />
                </div>
                <Separator />
                <div className="flex justify-end gap-2.5">
                  <Button variant="outline">Cancel</Button>
                  <Button>Save changes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card className="p-0">
              <CardHeader className="px-6 pt-6">
                <CardTitle>Notification preferences</CardTitle>
                <CardDescription>
                  Choose what you want to be notified about.
                </CardDescription>
              </CardHeader>
              <CardContent className="divide-border flex flex-col divide-y px-6 pb-6">
                {[
                  {
                    label: "Leave requests",
                    description: "When an employee submits a leave request.",
                  },
                  {
                    label: "Payroll runs",
                    description: "When a payroll cycle completes or fails.",
                  },
                  {
                    label: "New applicants",
                    description: "When a candidate applies to an open role.",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between gap-4 py-4 first:pt-2 last:pb-0"
                  >
                    <div>
                      <p className="text-foreground text-sm font-medium">{item.label}</p>
                      <p className="text-muted-foreground text-xs">{item.description}</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card className="p-0">
              <CardHeader className="px-6 pt-6">
                <CardTitle>Password & authentication</CardTitle>
                <CardDescription>Keep your account secure.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-5 px-6 pb-6">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="currentPassword">Current password</Label>
                  <Input id="currentPassword" type="password" placeholder="••••••••" />
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="newPassword">New password</Label>
                    <Input id="newPassword" type="password" placeholder="••••••••" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="confirmPassword">Confirm new password</Label>
                    <Input id="confirmPassword" type="password" placeholder="••••••••" />
                  </div>
                </div>
                <Separator />
                <div className="flex justify-end gap-2.5">
                  <Button variant="outline">Cancel</Button>
                  <Button>Update password</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </FadeIn>
    </div>
  );
}
