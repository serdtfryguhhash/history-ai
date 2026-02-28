"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Settings,
  User,
  CreditCard,
  Bell,
  Shield,

  Camera,
  Save,
  Crown,
  Sparkles,
  Star,
} from "lucide-react";

export default function SettingsPage() {
  const [name, setName] = useState("History Explorer");
  const [email, setEmail] = useState("explorer@example.com");

  return (
    <div className="min-h-screen bg-parchment">
      <div className="bg-gradient-to-b from-parchment-100 to-parchment py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-3 mb-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Settings className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="font-display text-3xl font-bold text-ink">Settings</h1>
                <p className="font-body text-ink-400">Manage your account and preferences</p>
              </div>
            </div>

            <Tabs defaultValue="profile" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="profile" className="gap-2">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">Profile</span>
                </TabsTrigger>
                <TabsTrigger value="subscription" className="gap-2">
                  <CreditCard className="h-4 w-4" />
                  <span className="hidden sm:inline">Subscription</span>
                </TabsTrigger>
                <TabsTrigger value="notifications" className="gap-2">
                  <Bell className="h-4 w-4" />
                  <span className="hidden sm:inline">Notifications</span>
                </TabsTrigger>
                <TabsTrigger value="security" className="gap-2">
                  <Shield className="h-4 w-4" />
                  <span className="hidden sm:inline">Security</span>
                </TabsTrigger>
              </TabsList>

              {/* Profile Tab */}
              <TabsContent value="profile">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>Update your personal information and avatar</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/15 border-2 border-accent/30">
                        <span className="font-display text-2xl font-bold text-primary">HE</span>
                      </div>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Camera className="h-4 w-4" />
                        Change Avatar
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-body text-sm font-medium text-ink mb-1.5">
                          Full Name
                        </label>
                        <Input value={name} onChange={(e) => setName(e.target.value)} />
                      </div>
                      <div>
                        <label className="block font-body text-sm font-medium text-ink mb-1.5">
                          Email
                        </label>
                        <Input value={email} onChange={(e) => setEmail(e.target.value)} />
                      </div>
                    </div>

                    <Button className="gap-2">
                      <Save className="h-4 w-4" />
                      Save Changes
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Subscription Tab */}
              <TabsContent value="subscription">
                <Card>
                  <CardHeader>
                    <CardTitle>Subscription</CardTitle>
                    <CardDescription>Manage your plan and billing</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between p-4 rounded-xl bg-accent/5 border border-accent/20">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                          <Star className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-display text-lg font-bold text-ink">Free Explorer</h3>
                          <p className="font-body text-sm text-ink-400">5 queries per day</p>
                        </div>
                      </div>
                      <Badge variant="parchment">Current Plan</Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl border border-accent/20 hover:border-accent/40 transition-colors">
                        <div className="flex items-center gap-2 mb-2">
                          <Sparkles className="h-5 w-5 text-accent" />
                          <h4 className="font-display font-bold text-ink">Scholar</h4>
                        </div>
                        <p className="font-display text-2xl font-bold text-primary mb-1">$9.99<span className="font-body text-sm text-ink-400">/mo</span></p>
                        <p className="font-body text-xs text-ink-400 mb-3">50 queries/day, all figures, full library</p>
                        <Button variant="outline" size="sm" className="w-full">Upgrade</Button>
                      </div>
                      <div className="p-4 rounded-xl border border-accent/20 hover:border-accent/40 transition-colors">
                        <div className="flex items-center gap-2 mb-2">
                          <Crown className="h-5 w-5 text-accent" />
                          <h4 className="font-display font-bold text-ink">Historian</h4>
                        </div>
                        <p className="font-display text-2xl font-bold text-primary mb-1">$24.99<span className="font-body text-sm text-ink-400">/mo</span></p>
                        <p className="font-body text-xs text-ink-400 mb-3">Unlimited, API access, custom timelines</p>
                        <Button size="sm" className="w-full">Upgrade</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Notifications Tab */}
              <TabsContent value="notifications">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>Choose how you want to be notified</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { title: "Daily Digest", description: "Receive the daily history fact each morning", enabled: true },
                      { title: "Weekly Newsletter", description: "This Week in History That Still Matters", enabled: true },
                      { title: "New Lessons", description: "Get notified when new lessons are published", enabled: false },
                      { title: "Product Updates", description: "New features and improvements", enabled: false },
                    ].map((notification, i) => (
                      <div key={i} className="flex items-center justify-between py-3 border-b border-accent/10 last:border-0">
                        <div>
                          <h4 className="font-display text-sm font-bold text-ink">{notification.title}</h4>
                          <p className="font-body text-xs text-ink-400">{notification.description}</p>
                        </div>
                        <div className={`w-10 h-6 rounded-full transition-colors cursor-pointer ${notification.enabled ? "bg-accent" : "bg-ink-200"}`}>
                          <div className={`h-5 w-5 rounded-full bg-white shadow transition-transform mt-0.5 ${notification.enabled ? "translate-x-4.5 ml-[18px]" : "ml-0.5"}`} />
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Security Tab */}
              <TabsContent value="security">
                <Card>
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                    <CardDescription>Manage your password and account security</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-display text-sm font-bold text-ink mb-3">Change Password</h4>
                      <div className="space-y-3 max-w-md">
                        <Input type="password" placeholder="Current password" />
                        <Input type="password" placeholder="New password" />
                        <Input type="password" placeholder="Confirm new password" />
                        <Button size="sm">Update Password</Button>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h4 className="font-display text-sm font-bold text-ink mb-2">Delete Account</h4>
                      <p className="font-body text-sm text-ink-400 mb-3">
                        Permanently delete your account and all associated data. This action cannot be
                        undone.
                      </p>
                      <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700">
                        Delete Account
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
