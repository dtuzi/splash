'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useWallet } from '@/context/WalletContext'
import { 
  Calendar, 
  MapPin, 
  Users, 
  DollarSign, 
  Image, 
  Lock,
  Upload,
  Info,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Eye,
  Sparkles
} from 'lucide-react'

type Step = 1 | 2 | 3 | 4

interface EventFormData {
  title: string
  description: string
  date: string
  time: string
  location: string
  capacity: number
  price: number
  isPrivate: boolean
  requiredBadge: string
  image: string | null
  tags: string[]
}

export default function CreateEventPage() {
  const router = useRouter()
  const { isConnected } = useWallet()
  const [step, setStep] = useState<Step>(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  
  const [formData, setFormData] = useState<EventFormData>({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    capacity: 100,
    price: 0,
    isPrivate: false,
    requiredBadge: '',
    image: null,
    tags: [],
  })

  const availableTags = [
    'Conference', 'Workshop', 'Hackathon', 'Meetup', 'Networking',
    'Education', 'NFT', 'DeFi', 'Gaming', 'Art', 'DAO', 'Development'
  ]

  const updateForm = (field: keyof EventFormData, value: unknown) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const toggleTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    // Simulate event creation
    await new Promise(resolve => setTimeout(resolve, 2500))
    setIsSubmitting(false)
    setShowSuccess(true)
  }

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.title && formData.description && formData.tags.length > 0
      case 2:
        return formData.date && formData.time && formData.location
      case 3:
        return formData.capacity > 0
      case 4:
        return true
      default:
        return false
    }
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Lock className="w-16 h-16 mx-auto text-text-muted mb-4" />
          <h1 className="text-2xl font-bold mb-2">Connect Wallet</h1>
          <p className="text-text-muted mb-6">Please connect your wallet to create an event</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">Create Event</h1>
          <p className="text-text-muted">
            Deploy your event on Sui blockchain with NFT tickets stored on Walrus
          </p>
        </motion.div>

        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between relative">
            {/* Progress Line */}
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-white/10" />
            <div 
              className="absolute top-5 left-0 h-0.5 bg-sui-blue transition-all duration-500"
              style={{ width: `${((step - 1) / 3) * 100}%` }}
            />
            
            {/* Steps */}
            {[
              { num: 1, label: 'Basic Info' },
              { num: 2, label: 'Date & Location' },
              { num: 3, label: 'Tickets' },
              { num: 4, label: 'Review' },
            ].map(({ num, label }) => (
              <div key={num} className="relative z-10 flex flex-col items-center">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                    step >= num 
                      ? 'bg-sui-blue text-white' 
                      : 'bg-bg-card border border-white/10 text-text-muted'
                  }`}
                >
                  {step > num ? <CheckCircle className="w-5 h-5" /> : num}
                </div>
                <span className={`mt-2 text-sm ${step >= num ? 'text-white' : 'text-text-muted'}`}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Form Steps */}
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="card"
        >
          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-2">Basic Information</h2>
                <p className="text-text-muted text-sm">Tell attendees about your event</p>
              </div>

              <div className="space-y-4">
                <div className="input-group">
                  <label className="text-sm text-text-muted mb-2 block">Event Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => updateForm('title', e.target.value)}
                    placeholder="e.g. Sui Builder House 2025"
                    className="input"
                  />
                </div>

                <div className="input-group">
                  <label className="text-sm text-text-muted mb-2 block">Description *</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => updateForm('description', e.target.value)}
                    placeholder="Describe your event, what attendees can expect..."
                    rows={4}
                    className="input resize-none"
                  />
                </div>

                <div>
                  <label className="text-sm text-text-muted mb-2 block">Tags * (select at least one)</label>
                  <div className="flex flex-wrap gap-2">
                    {availableTags.map(tag => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => toggleTag(tag)}
                        className={`px-3 py-1.5 rounded text-sm transition-colors ${
                          formData.tags.includes(tag)
                            ? 'bg-sui-blue text-white'
                            : 'bg-white/5 text-text-muted hover:bg-white/10'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm text-text-muted mb-2 block">Event Image</label>
                  <div className="border-2 border-dashed border-white/10 rounded-lg p-8 text-center hover:border-white/20 transition-colors cursor-pointer">
                    <Upload className="w-10 h-10 mx-auto text-text-muted mb-4" />
                    <p className="text-text-muted text-sm mb-2">
                      Drag & drop or click to upload
                    </p>
                    <p className="text-xs text-text-muted">
                      Image will be stored on Walrus
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Date & Location */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-2">Date & Location</h2>
                <p className="text-text-muted text-sm">When and where is your event?</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="input-group">
                  <label className="text-sm text-text-muted mb-2 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Date *
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => updateForm('date', e.target.value)}
                    className="input"
                  />
                </div>

                <div className="input-group">
                  <label className="text-sm text-text-muted mb-2 block">Time *</label>
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) => updateForm('time', e.target.value)}
                    className="input"
                  />
                </div>
              </div>

              <div className="input-group">
                <label className="text-sm text-text-muted mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Location *
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => updateForm('location', e.target.value)}
                  placeholder="e.g. San Francisco, CA or Virtual"
                  className="input"
                />
              </div>

              <div className="p-4 bg-seal-purple/10 border border-seal-purple/30 rounded-lg">
                <div className="flex items-start gap-3">
                  <Lock className="w-5 h-5 text-seal-purple mt-0.5" />
                  <div>
                    <p className="font-medium text-seal-purple">Seal Encryption</p>
                    <p className="text-sm text-text-muted mt-1">
                      Exact venue address and access details will be encrypted. 
                      Only ticket holders can decrypt this information.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Tickets */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-2">Ticket Settings</h2>
                <p className="text-text-muted text-sm">Configure your event tickets</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="input-group">
                  <label className="text-sm text-text-muted mb-2 flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Capacity *
                  </label>
                  <input
                    type="number"
                    value={formData.capacity}
                    onChange={(e) => updateForm('capacity', parseInt(e.target.value) || 0)}
                    min="1"
                    className="input"
                  />
                </div>

                <div className="input-group">
                  <label className="text-sm text-text-muted mb-2 flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    Ticket Price (SUI)
                  </label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => updateForm('price', parseFloat(e.target.value) || 0)}
                    min="0"
                    step="0.1"
                    placeholder="0 for free events"
                    className="input"
                  />
                </div>
              </div>

              <div className="p-4 bg-white/5 rounded-lg space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Lock className="w-5 h-5 text-seal-purple" />
                    <div>
                      <p className="font-medium">Private Event</p>
                      <p className="text-sm text-text-muted">Restrict access to badge holders</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => updateForm('isPrivate', !formData.isPrivate)}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      formData.isPrivate ? 'bg-seal-purple' : 'bg-white/10'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transform transition-transform ${
                      formData.isPrivate ? 'translate-x-6' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>

                {formData.isPrivate && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="pt-4 border-t border-white/10"
                  >
                    <label className="text-sm text-text-muted mb-2 block">Required Badge</label>
                    <select
                      value={formData.requiredBadge}
                      onChange={(e) => updateForm('requiredBadge', e.target.value)}
                      className="input"
                    >
                      <option value="">Select a badge requirement</option>
                      <option value="Early Adopter">Early Adopter</option>
                      <option value="Whale">Whale</option>
                      <option value="Builder">Builder</option>
                      <option value="DAO Member">DAO Member</option>
                    </select>
                  </motion.div>
                )}
              </div>

              <div className="p-4 bg-walrus-teal/10 border border-walrus-teal/30 rounded-lg">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-walrus-teal mt-0.5" />
                  <div>
                    <p className="font-medium text-walrus-teal">NFT Tickets on Sui</p>
                    <p className="text-sm text-text-muted mt-1">
                      Each ticket is an NFT minted on Sui blockchain. 
                      Ticket metadata is stored on Walrus with Seal encryption for private details.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Review */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-2">Review & Deploy</h2>
                <p className="text-text-muted text-sm">Confirm your event details before publishing</p>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-white/5 rounded-lg">
                  <h3 className="font-semibold text-lg mb-1">{formData.title || 'Untitled Event'}</h3>
                  <p className="text-text-muted text-sm">{formData.description || 'No description'}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {formData.tags.map(tag => (
                      <span key={tag} className="px-2 py-0.5 bg-sui-blue/20 text-sui-blue rounded text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-white/5 rounded-lg">
                    <div className="flex items-center gap-2 text-text-muted text-sm mb-1">
                      <Calendar className="w-4 h-4" />
                      Date & Time
                    </div>
                    <p className="font-medium">{formData.date || 'Not set'} at {formData.time || '--:--'}</p>
                  </div>
                  <div className="p-4 bg-white/5 rounded-lg">
                    <div className="flex items-center gap-2 text-text-muted text-sm mb-1">
                      <MapPin className="w-4 h-4" />
                      Location
                    </div>
                    <p className="font-medium">{formData.location || 'Not set'}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-white/5 rounded-lg">
                    <div className="flex items-center gap-2 text-text-muted text-sm mb-1">
                      <Users className="w-4 h-4" />
                      Capacity
                    </div>
                    <p className="font-medium">{formData.capacity} attendees</p>
                  </div>
                  <div className="p-4 bg-white/5 rounded-lg">
                    <div className="flex items-center gap-2 text-text-muted text-sm mb-1">
                      <DollarSign className="w-4 h-4" />
                      Price
                    </div>
                    <p className="font-medium">
                      {formData.price === 0 ? 'Free' : `${formData.price} SUI`}
                    </p>
                  </div>
                </div>

                {formData.isPrivate && (
                  <div className="p-4 bg-seal-purple/10 border border-seal-purple/30 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Lock className="w-4 h-4 text-seal-purple" />
                      <span className="text-seal-purple font-medium">Private Event</span>
                    </div>
                    {formData.requiredBadge && (
                      <p className="text-sm text-text-muted mt-1">
                        Requires &quot;{formData.requiredBadge}&quot; badge
                      </p>
                    )}
                  </div>
                )}

                <div className="p-4 bg-gradient-to-r from-sui-blue/10 via-seal-purple/10 to-walrus-teal/10 border border-white/10 rounded-lg">
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-sui-blue" />
                    What happens next?
                  </h4>
                  <ul className="space-y-2 text-sm text-text-muted">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-walrus-teal" />
                      Event smart contract deployed on Sui
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-walrus-teal" />
                      Metadata stored on Walrus
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-walrus-teal" />
                      Ticket NFT collection created
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-walrus-teal" />
                      Event page live on Walrus Sites
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-white/10">
            {step > 1 ? (
              <button
                onClick={() => setStep((step - 1) as Step)}
                className="btn btn-secondary"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
            ) : (
              <div />
            )}
            
            {step < 4 ? (
              <button
                onClick={() => setStep((step + 1) as Step)}
                disabled={!canProceed()}
                className="btn btn-primary"
              >
                Continue
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="btn btn-primary"
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin">⟳</span>
                    Deploying Event...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Deploy Event
                  </>
                )}
              </button>
            )}
          </div>
        </motion.div>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-bg-card border border-white/10 rounded-lg w-full max-w-md p-8 text-center"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-walrus-teal/20 flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-walrus-teal" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Event Created!</h2>
              <p className="text-text-muted mb-6">
                Your event has been deployed on Sui and is now live on Walrus Sites.
              </p>
              <div className="p-4 bg-white/5 rounded-lg mb-6 text-left">
                <p className="text-sm text-text-muted mb-2">Contract Address:</p>
                <p className="font-mono text-sm text-walrus-teal">0x8f2a...e1c9</p>
              </div>
              <div className="space-y-3">
                <button
                  onClick={() => router.push('/dashboard')}
                  className="w-full btn btn-primary"
                >
                  Go to Dashboard
                </button>
                <button
                  onClick={() => router.push('/events/1')}
                  className="w-full btn btn-secondary"
                >
                  <Eye className="w-4 h-4" />
                  View Event Page
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}


