"use client"

import { GripVertical } from "lucide-react"
import { cn } from "@/lib/utils"

// Some versions of react-resizable-panels export named members differently.
// Use a runtime require and `any` to avoid TypeScript complaining about
// mismatched typings while preserving runtime behavior.
let ResizablePrimitive: any
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  ResizablePrimitive = require("react-resizable-panels")
} catch (e) {
  // Fallback minimal stubs for environments where the package isn't available.
  ResizablePrimitive = {
    PanelGroup: (props: any) => <div {...props} />,
    Panel: (props: any) => <div {...props} />,
    PanelResizeHandle: (props: any) => <div {...props} />,
  }
}

const PanelGroupImpl: any = ResizablePrimitive.PanelGroup || ((props: any) => <div {...props} />)

const ResizablePanelGroup = ({ className, ...props }: any) => (
  <PanelGroupImpl
    className={cn(
      "flex h-full w-full data-[panel-group-direction=vertical]:flex-col",
      className
    )}
    {...props}
  />
)

const ResizablePanel = ResizablePrimitive.Panel

const ResizableHandle = ({
  withHandle,
  className,
  ...props
}: React.ComponentProps<any> & { withHandle?: boolean }) => (
  <ResizablePrimitive.PanelResizeHandle
    className={cn(
      "relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90",
      className
    )}
    {...props}
  >
    {withHandle && (
      <div className="z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border">
        <GripVertical className="h-2.5 w-2.5" />
      </div>
    )}
  </ResizablePrimitive.PanelResizeHandle>
)

export { ResizablePanelGroup, ResizablePanel, ResizableHandle }
