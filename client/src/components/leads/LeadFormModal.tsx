import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Modal } from "../ui/Modal";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";
import { Button } from "../ui/Button";
import { useLeadStore } from "../../store/leadStore";
import { LEAD_STATUSES, LEAD_SOURCES } from "../../constants/lead";
import type { Lead } from "../../types/lead";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(5, "Phone number is required"),
  lastMessage: z.string().optional(),
  companyName: z.string().min(2, "Required"),
  companyDescription: z.string().min(5, "Required"),
  interestLevel: z.number().min(1, "1-10").max(10, "1-10"),
  status: z.enum(["New", "Contacted", "Qualified", "Lost"]).optional(),
  source: z.enum(["Website", "Instagram", "Referral"]),
});

type FormValues = z.infer<typeof schema>;

interface LeadFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  editLead?: Lead | null;
}

export const LeadFormModal = ({ isOpen, onClose, editLead }: LeadFormModalProps) => {
  const { createLead, updateLead } = useLeadStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (isOpen) {
      reset(
        editLead
          ? { 
              name: editLead.name, 
              email: editLead.email, 
              phone: editLead.phone || "",
              lastMessage: editLead.lastMessage || "",
              companyName: editLead.companyName || "",
              companyDescription: editLead.companyDescription || "",
              interestLevel: editLead.interestLevel || 5,
              status: editLead.status, 
              source: editLead.source 
            }
          : { name: "", email: "", phone: "", lastMessage: "", companyName: "", companyDescription: "", interestLevel: 5, status: "New", source: "Website" }
      );
    }
  }, [isOpen, editLead, reset]);

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      if (editLead) {
        await updateLead(editLead._id, data);
      } else {
        await createLead(data);
      }
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={editLead ? "Edit Lead" : "Add New Lead"}
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit(onSubmit)}
            loading={isSubmitting}
          >
            {editLead ? "Save Changes" : "Create Lead"}
          </Button>
        </>
      }
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Input
          id="lead-name"
          label="Full Name"
          placeholder="e.g. Jane Smith"
          error={errors.name?.message}
          {...register("name")}
        />
        <Input
          id="lead-email"
          label="Email Address"
          type="email"
          placeholder="e.g. jane@example.com"
          error={errors.email?.message}
          {...register("email")}
        />
        <Input
          id="lead-phone"
          label="Phone Number"
          type="tel"
          placeholder="e.g. +1 234 567 8900"
          error={errors.phone?.message}
          {...register("phone")}
        />
        <Input
          id="lead-last-message"
          label="Last Message (Optional)"
          placeholder="e.g. Customer asked about pricing..."
          error={errors.lastMessage?.message}
          {...register("lastMessage")}
        />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <Input
            id="lead-company"
            label="Company Name"
            placeholder="e.g. Acme Corp"
            error={errors.companyName?.message}
            {...register("companyName")}
          />
          <Input
            id="lead-interest"
            label="Interest Level (1-10)"
            type="number"
            min="1"
            max="10"
            placeholder="5"
            error={errors.interestLevel?.message}
            {...register("interestLevel", { valueAsNumber: true })}
          />
        </div>
        <Input
          id="lead-company-desc"
          label="Company Description"
          placeholder="e.g. A fast-growing tech startup..."
          error={errors.companyDescription?.message}
          {...register("companyDescription")}
        />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <Select
            id="lead-status"
            label="Status"
            options={LEAD_STATUSES}
            error={errors.status?.message}
            {...register("status")}
          />
          <Select
            id="lead-source"
            label="Source"
            options={LEAD_SOURCES}
            error={errors.source?.message}
            {...register("source")}
          />
        </div>
      </div>
    </Modal>
  );
};
