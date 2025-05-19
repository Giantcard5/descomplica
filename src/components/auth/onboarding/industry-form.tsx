'use client';

import React, { useState } from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { Upload, Building, Plus, Trash2 } from 'lucide-react';

interface IndustryOnboardingFormProps {
    step: number;
    onComplete: () => void;
}

export function IndustryOnboardingForm({ step, onComplete }: IndustryOnboardingFormProps) {
    const [companyLogo, setCompanyLogo] = useState<string | null>(null);
    const [teamMembers, setTeamMembers] = useState([{ name: '', email: '', role: 'viewer' }]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onComplete();
    };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setCompanyLogo(url);
        }
    };

    const addTeamMember = () => {
        setTeamMembers([...teamMembers, { name: '', email: '', role: 'viewer' }]);
    };

    const removeTeamMember = (index: number) => {
        const updatedMembers = [...teamMembers];
        updatedMembers.splice(index, 1);
        setTeamMembers(updatedMembers);
    };

    const updateTeamMember = (index: number, field: string, value: string) => {
        const updatedMembers = [...teamMembers];
        updatedMembers[index] = { ...updatedMembers[index], [field]: value };
        setTeamMembers(updatedMembers);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 && (
                <div className="space-y-6">
                    <div className="space-y-2">
                        <h2 className="text-xl font-semibold">Company Information</h2>
                        <p className="text-sm text-muted-foreground">
                            Tell us about your company. This information helps us tailor our
                            services to your needs.
                        </p>
                    </div>

                    <div className="flex flex-col items-center space-y-4 sm:flex-row sm:items-start sm:space-x-4 sm:space-y-0">
                        <Avatar className="h-24 w-24">
                            <AvatarImage
                                src={companyLogo || '/placeholder.svg?height=96&width=96'}
                                alt="Company Logo"
                            />
                            <AvatarFallback>
                                <Building className="h-12 w-12" />
                            </AvatarFallback>
                        </Avatar>
                        <div className="space-y-2">
                            <h3 className="text-lg font-medium">Company Logo</h3>
                            <p className="text-sm text-muted-foreground">
                                Upload your company logo. This will be displayed on your profile.
                            </p>
                            <div className="flex gap-2">
                                <label htmlFor="company-logo-upload" className="cursor-pointer">
                                    <div className="flex items-center gap-1 rounded-md border px-3 py-1 text-sm">
                                        <Upload className="h-4 w-4" />
                                        Upload
                                    </div>
                                    <input
                                        id="company-logo-upload"
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleImageUpload}
                                    />
                                </label>
                                {companyLogo && (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="text-destructive"
                                        onClick={() => setCompanyLogo(null)}
                                        type="button"
                                    >
                                        Remove
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                        <Label htmlFor="company-name">Company Name</Label>
                        <Input id="company-name" placeholder="Acme Corporation" required />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="industry">Industry</Label>
                            <Select defaultValue="consumer-goods">
                                <SelectTrigger id="industry">
                                    <SelectValue placeholder="Select industry" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="consumer-goods">Consumer Goods</SelectItem>
                                    <SelectItem value="technology">Technology</SelectItem>
                                    <SelectItem value="healthcare">Healthcare</SelectItem>
                                    <SelectItem value="finance">Finance</SelectItem>
                                    <SelectItem value="retail">Retail</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="company-size">Company Size</Label>
                            <Select defaultValue="medium">
                                <SelectTrigger id="company-size">
                                    <SelectValue placeholder="Select company size" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="small">1-50 employees</SelectItem>
                                    <SelectItem value="medium">51-500 employees</SelectItem>
                                    <SelectItem value="large">501-5000 employees</SelectItem>
                                    <SelectItem value="enterprise">5000+ employees</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="company-website">Website</Label>
                        <Input id="company-website" type="url" placeholder="https://example.com" />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="company-description">Company Description</Label>
                        <Textarea
                            id="company-description"
                            placeholder="Describe your company"
                            rows={3}
                        />
                    </div>
                </div>
            )}

            {step === 2 && (
                <div className="space-y-6">
                    <div className="space-y-2">
                        <h2 className="text-xl font-semibold">Company Address</h2>
                        <p className="text-sm text-muted-foreground">
                            Provide your company's address information.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="company-address">Address Line 1</Label>
                        <Input
                            id="company-address"
                            placeholder="123 Business St, Suite 100"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="address-line-2">Address Line 2</Label>
                        <Input id="address-line-2" placeholder="Floor 4, Office 401" />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-3">
                        <div className="space-y-2">
                            <Label htmlFor="city">City</Label>
                            <Input id="city" placeholder="San Francisco" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="state">State/Province</Label>
                            <Input id="state" placeholder="CA" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="zip">Zip/Postal Code</Label>
                            <Input id="zip" placeholder="94107" required />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="country">Country</Label>
                        <Select defaultValue="us">
                            <SelectTrigger id="country">
                                <SelectValue placeholder="Select country" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="us">United States</SelectItem>
                                <SelectItem value="ca">Canada</SelectItem>
                                <SelectItem value="mx">Mexico</SelectItem>
                                <SelectItem value="br">Brazil</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" required />
                    </div>
                </div>
            )}

            {step === 3 && (
                <div className="space-y-6">
                    <div className="space-y-2">
                        <h2 className="text-xl font-semibold">Team Members</h2>
                        <p className="text-sm text-muted-foreground">
                            Add team members who will have access to your Descomplica account.
                        </p>
                    </div>

                    <div className="space-y-4">
                        {teamMembers.map((member, index) => (
                            <div key={index} className="rounded-md border p-4 space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-medium">Team Member {index + 1}</h3>
                                    {index > 0 && (
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-8 w-8 p-0 text-destructive"
                                            onClick={() => removeTeamMember(index)}
                                            type="button"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                            <span className="sr-only">Remove</span>
                                        </Button>
                                    )}
                                </div>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor={`member-name-${index}`}>Name</Label>
                                        <Input
                                            id={`member-name-${index}`}
                                            value={member.name}
                                            onChange={(e) =>
                                                updateTeamMember(index, 'name', e.target.value)
                                            }
                                            placeholder="John Smith"
                                            required={index === 0}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor={`member-email-${index}`}>Email</Label>
                                        <Input
                                            id={`member-email-${index}`}
                                            type="email"
                                            value={member.email}
                                            onChange={(e) =>
                                                updateTeamMember(index, 'email', e.target.value)
                                            }
                                            placeholder="john.smith@example.com"
                                            required={index === 0}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor={`member-role-${index}`}>Role</Label>
                                    <Select
                                        value={member.role}
                                        onValueChange={(value) =>
                                            updateTeamMember(index, 'role', value)
                                        }
                                    >
                                        <SelectTrigger id={`member-role-${index}`}>
                                            <SelectValue placeholder="Select role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="admin">
                                                Admin (Full access)
                                            </SelectItem>
                                            <SelectItem value="manager">
                                                Manager (Limited settings)
                                            </SelectItem>
                                            <SelectItem value="analyst">
                                                Analyst (Data access)
                                            </SelectItem>
                                            <SelectItem value="viewer">
                                                Viewer (Read-only)
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        ))}

                        <Button
                            type="button"
                            variant="outline"
                            className="w-full gap-2"
                            onClick={addTeamMember}
                        >
                            <Plus className="h-4 w-4" />
                            Add Another Team Member
                        </Button>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="notification-preferences">
                            Team Notification Preferences
                        </Label>
                        <Select defaultValue="all">
                            <SelectTrigger id="notification-preferences">
                                <SelectValue placeholder="Select notification preferences" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">
                                    All team members receive notifications
                                </SelectItem>
                                <SelectItem value="admin">
                                    Only admins receive notifications
                                </SelectItem>
                                <SelectItem value="custom">Custom notification settings</SelectItem>
                            </SelectContent>
                        </Select>
                        <p className="text-xs text-muted-foreground">
                            You can customize individual notification preferences later in settings.
                        </p>
                    </div>
                </div>
            )}

            <Button type="submit" className="w-full">
                {step < 3 ? 'Continue' : 'Complete Setup'}
            </Button>
        </form>
    );
}
