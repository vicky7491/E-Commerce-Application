import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import AdminCastingKitTile from '@/components/admin-view/CastingKitTile';
import { Button } from '@/components/ui/button';
import ConfirmDialog from '@/components/ui/ConfirmDialog';
import { useToast } from '@/components/ui/use-toast';
import CastingKitForm from '@/components/admin-view/CastingKitForm';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';

const AdminCastingKits = () => {
  const [kits, setKits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [openCreateKitDialog, setOpenCreateKitDialog] = useState(false);
  const [formData, setFormData] = useState(null);
  const [currentEditedId, setCurrentEditedId] = useState(null);

  const { toast } = useToast();

  const fetchKits = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/admin/casting-kits/all', {
        withCredentials: true,
      });
      setKits(res.data.kits);
    } catch (err) {
      toast({
        title: "Failed to fetch casting kits",
        description: err.response?.data?.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteKit = (id) => {
    setDeleteTargetId(id);
    setShowConfirm(true);
  };

  const confirmDeleteKit = async () => {
    if (!deleteTargetId) return;
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/admin/casting-kits/${deleteTargetId}`,
        { withCredentials: true }
      );

      if (res.status === 200) {
        toast({
          title: "Casting kit deleted",
          description: "The kit was successfully removed.",
        });
        setKits(prev => prev.filter(kit => kit._id !== deleteTargetId));
      }
    } catch (err) {
      toast({
        title: "Failed to delete kit",
        description: err.response?.data?.message || "Something went wrong.",
        variant: "destructive",
      });
    } finally {
      setShowConfirm(false);
      setDeleteTargetId(null);
    }
  };

  useEffect(() => {
    fetchKits();
  }, []);

  return (
    <Fragment>
       <div className="mb-5 w-full flex justify-end">
        <Button
  onClick={() => {
    setFormData({
      title: "",
      description: "",
      price: "",
      stock: "",
      images: [],
    });
    setCurrentEditedId(null);
    setOpenCreateKitDialog(true);
  }}
>
  Add New Casting Kit
</Button>

      </div>
    <div className="max-w-6xl mx-auto px-4 py-8">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
          {kits.map((kit) => (
            <AdminCastingKitTile
              key={kit._id}
              kit={kit}
              setFormData={setFormData}
              setOpenCreateKitDialog={setOpenCreateKitDialog}
              setCurrentEditedId={setCurrentEditedId}
              handleDelete={handleDeleteKit}
            />
          ))}
        </div>
      )}

      <Sheet
        open={openCreateKitDialog}
        onOpenChange={(open) => {
          setOpenCreateKitDialog(open);
          if (!open) {
            setFormData(null);
            setCurrentEditedId(null);
          }
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {currentEditedId ? "Edit Casting Kit" : "Add Casting Kit"}
            </SheetTitle>
          </SheetHeader>
          <div className="py-6">
            <CastingKitForm
              formData={formData}
              setFormData={setFormData}
              currentEditedId={currentEditedId}
              refresh={fetchKits}
              closeSheet={() => setOpenCreateKitDialog(false)}
            />
          </div>
        </SheetContent>
      </Sheet>

      <ConfirmDialog
        open={showConfirm}
        onCancel={() => setShowConfirm(false)}
        onConfirm={confirmDeleteKit}
        title="Delete Casting Kit?"
        description="Are you sure you want to delete this casting kit? This action cannot be undone."
      />
    </div>
    </Fragment>
  );
};

export default AdminCastingKits;
