"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";

interface WizardData {
  organizationName: string;
  orgType: string;
  orgSize: string;
  workspaces: Array<{
    name: string;
    description: string;
  }>;
  departments: Array<{
    name: string;
    description: string;
  }>;
}

interface OnboardingWizardProps {
  organizationName: string;
}

export function OnboardingWizard({ organizationName }: OnboardingWizardProps) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [wizardData, setWizardData] = useState<WizardData>({
    organizationName,
    orgType: "",
    orgSize: "",
    workspaces: [],
    departments: [],
  });

  const [tempWorkspace, setTempWorkspace] = useState({
    name: "",
    description: "",
  });
  const [tempDepartment, setTempDepartment] = useState({
    name: "",
    description: "",
  });

  const steps = [
    { id: 1, title: "Organization Details" },
    { id: 2, title: "Workspaces" },
    { id: 3, title: "Departments" },
    { id: 4, title: "Review" },
  ];

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinish = () => {
    // Store wizard data in localStorage for dashboard to use
    localStorage.setItem("onboardingData", JSON.stringify(wizardData));
    router.push("/dashboard");
  };

  const addWorkspace = () => {
    if (tempWorkspace.name.trim()) {
      setWizardData({
        ...wizardData,
        workspaces: [...wizardData.workspaces, { ...tempWorkspace }],
      });
      setTempWorkspace({ name: "", description: "" });
    }
  };

  const removeWorkspace = (index: number) => {
    setWizardData({
      ...wizardData,
      workspaces: wizardData.workspaces.filter((_, i) => i !== index),
    });
  };

  const addDepartment = () => {
    if (tempDepartment.name.trim()) {
      setWizardData({
        ...wizardData,
        departments: [...wizardData.departments, { ...tempDepartment }],
      });
      setTempDepartment({ name: "", description: "" });
    }
  };

  const removeDepartment = (index: number) => {
    setWizardData({
      ...wizardData,
      departments: wizardData.departments.filter((_, i) => i !== index),
    });
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return wizardData.orgType && wizardData.orgSize;
      case 2:
        return wizardData.workspaces.length > 0;
      case 3:
        return wizardData.departments.length > 0;
      case 4:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-[#09090B] flex items-center justify-center p-6">
      <div className="w-full max-w-4xl">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                      currentStep > step.id
                        ? "bg-[#22D3EE] text-[#09090B]"
                        : currentStep === step.id
                          ? "bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] text-white"
                          : "bg-[#0F1117] text-gray-500 border border-white/10"
                    }`}
                  >
                    {currentStep > step.id ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      step.id
                    )}
                  </div>
                  <span
                    className={`text-xs mt-2 ${
                      currentStep >= step.id ? "text-white" : "text-gray-500"
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-4 ${
                      currentStep > step.id ? "bg-[#22D3EE]" : "bg-white/10"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Wizard Content */}
        <div className="bg-[#0F1117]/75 backdrop-blur-xl rounded-2xl border border-white/5 shadow-[0_0_40px_rgba(34,211,238,0.1)] p-8">
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  Tell us about your organization
                </h2>
                <p className="text-gray-400">
                  Organization:{" "}
                  <span className="text-[#22D3EE]">{organizationName}</span>
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-300 block mb-2">
                    Organization Type
                  </label>
                  <select
                    value={wizardData.orgType}
                    onChange={(e) =>
                      setWizardData({ ...wizardData, orgType: e.target.value })
                    }
                    className="w-full h-[48px] px-4 bg-[#0F1117]/50 backdrop-blur-sm border border-white/5 rounded-xl text-white focus:outline-none focus:border-[#22D3EE]/30 transition-all"
                  >
                    <option value="">Select organization type</option>
                    <option value="startup">Startup</option>
                    <option value="small_business">Small Business</option>
                    <option value="mid_size">Mid-size Company</option>
                    <option value="enterprise">Enterprise</option>
                    <option value="non_profit">Non-Profit</option>
                    <option value="government">Government</option>
                    <option value="education">Education</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-300 block mb-2">
                    Organization Size
                  </label>
                  <select
                    value={wizardData.orgSize}
                    onChange={(e) =>
                      setWizardData({ ...wizardData, orgSize: e.target.value })
                    }
                    className="w-full h-[48px] px-4 bg-[#0F1117]/50 backdrop-blur-sm border border-white/5 rounded-xl text-white focus:outline-none focus:border-[#22D3EE]/30 transition-all"
                  >
                    <option value="">Select organization size</option>
                    <option value="1-10">1-10 employees</option>
                    <option value="11-50">11-50 employees</option>
                    <option value="51-200">51-200 employees</option>
                    <option value="201-500">201-500 employees</option>
                    <option value="500+">500+ employees</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  Create your workspaces
                </h2>
                <p className="text-gray-400">
                  Add workspaces to organize your team&apos;s projects and
                  activities
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-300 block mb-2">
                    Workspace Name
                  </label>
                  <input
                    type="text"
                    value={tempWorkspace.name}
                    onChange={(e) =>
                      setTempWorkspace({
                        ...tempWorkspace,
                        name: e.target.value,
                      })
                    }
                    placeholder="e.g., Marketing, Engineering, Design"
                    className="w-full h-[48px] px-4 bg-[#0F1117]/50 backdrop-blur-sm border border-white/5 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-[#22D3EE]/30 transition-all"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-300 block mb-2">
                    Description (optional)
                  </label>
                  <textarea
                    value={tempWorkspace.description}
                    onChange={(e) =>
                      setTempWorkspace({
                        ...tempWorkspace,
                        description: e.target.value,
                      })
                    }
                    placeholder="Brief description of this workspace"
                    rows={3}
                    className="w-full px-4 py-3 bg-[#0F1117]/50 backdrop-blur-sm border border-white/5 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-[#22D3EE]/30 transition-all resize-none"
                  />
                </div>

                <button
                  type="button"
                  onClick={addWorkspace}
                  className="w-full h-[48px] rounded-xl font-semibold text-white bg-[#8B5CF6] hover:bg-[#7C3AED] transition-all"
                >
                  Add Workspace
                </button>

                {wizardData.workspaces.length > 0 && (
                  <div className="space-y-2 mt-4">
                    <label className="text-sm font-medium text-gray-300 block">
                      Added Workspaces
                    </label>
                    {wizardData.workspaces.map((workspace, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-[#0F1117]/50 border border-white/5 rounded-xl"
                      >
                        <div>
                          <p className="text-white font-medium">
                            {workspace.name}
                          </p>
                          {workspace.description && (
                            <p className="text-gray-400 text-sm">
                              {workspace.description}
                            </p>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => removeWorkspace(index)}
                          className="text-red-400 hover:text-red-300 transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  Create your departments
                </h2>
                <p className="text-gray-400">
                  Add departments to structure your organization
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-300 block mb-2">
                    Department Name
                  </label>
                  <input
                    type="text"
                    value={tempDepartment.name}
                    onChange={(e) =>
                      setTempDepartment({
                        ...tempDepartment,
                        name: e.target.value,
                      })
                    }
                    placeholder="e.g., Human Resources, Finance, IT"
                    className="w-full h-[48px] px-4 bg-[#0F1117]/50 backdrop-blur-sm border border-white/5 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-[#22D3EE]/30 transition-all"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-300 block mb-2">
                    Description (optional)
                  </label>
                  <textarea
                    value={tempDepartment.description}
                    onChange={(e) =>
                      setTempDepartment({
                        ...tempDepartment,
                        description: e.target.value,
                      })
                    }
                    placeholder="Brief description of this department"
                    rows={3}
                    className="w-full px-4 py-3 bg-[#0F1117]/50 backdrop-blur-sm border border-white/5 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-[#22D3EE]/30 transition-all resize-none"
                  />
                </div>

                <button
                  type="button"
                  onClick={addDepartment}
                  className="w-full h-[48px] rounded-xl font-semibold text-white bg-[#8B5CF6] hover:bg-[#7C3AED] transition-all"
                >
                  Add Department
                </button>

                {wizardData.departments.length > 0 && (
                  <div className="space-y-2 mt-4">
                    <label className="text-sm font-medium text-gray-300 block">
                      Added Departments
                    </label>
                    {wizardData.departments.map((department, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-[#0F1117]/50 border border-white/5 rounded-xl"
                      >
                        <div>
                          <p className="text-white font-medium">
                            {department.name}
                          </p>
                          {department.description && (
                            <p className="text-gray-400 text-sm">
                              {department.description}
                            </p>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => removeDepartment(index)}
                          className="text-red-400 hover:text-red-300 transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  Review your setup
                </h2>
                <p className="text-gray-400">
                  Review all the information before completing your setup
                </p>
              </div>

              <div className="space-y-6">
                <div className="p-4 bg-[#0F1117]/50 border border-white/5 rounded-xl space-y-3">
                  <h3 className="text-lg font-semibold text-[#22D3EE]">
                    Organization
                  </h3>
                  <div className="space-y-1">
                    <p className="text-white">
                      <span className="text-gray-400">Name:</span>{" "}
                      {wizardData.organizationName}
                    </p>
                    <p className="text-white">
                      <span className="text-gray-400">Type:</span>{" "}
                      {wizardData.orgType}
                    </p>
                    <p className="text-white">
                      <span className="text-gray-400">Size:</span>{" "}
                      {wizardData.orgSize} employees
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-[#0F1117]/50 border border-white/5 rounded-xl space-y-3">
                  <h3 className="text-lg font-semibold text-[#8B5CF6]">
                    Workspaces ({wizardData.workspaces.length})
                  </h3>
                  {wizardData.workspaces.map((workspace, index) => (
                    <div
                      key={index}
                      className="pl-4 border-l-2 border-white/10"
                    >
                      <p className="text-white font-medium">{workspace.name}</p>
                      {workspace.description && (
                        <p className="text-gray-400 text-sm">
                          {workspace.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-[#0F1117]/50 border border-white/5 rounded-xl space-y-3">
                  <h3 className="text-lg font-semibold text-[#3B82F6]">
                    Departments ({wizardData.departments.length})
                  </h3>
                  {wizardData.departments.map((department, index) => (
                    <div
                      key={index}
                      className="pl-4 border-l-2 border-white/10"
                    >
                      <p className="text-white font-medium">
                        {department.name}
                      </p>
                      {department.description && (
                        <p className="text-gray-400 text-sm">
                          {department.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
            <button
              type="button"
              onClick={handleBack}
              disabled={currentStep === 1}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                currentStep === 1
                  ? "text-gray-500 cursor-not-allowed"
                  : "text-white hover:bg-white/5"
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
              Back
            </button>

            {currentStep < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                disabled={!isStepValid()}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                  isStepValid()
                    ? "bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] text-white hover:shadow-[0_0_30px_rgba(139,92,246,0.3)]"
                    : "bg-white/5 text-gray-500 cursor-not-allowed"
                }`}
              >
                Next
                <ChevronRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinish}
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] text-white hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] transition-all"
              >
                <Check className="w-5 h-5" />
                Finish Setup
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
