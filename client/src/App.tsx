import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import {
  ColorGenerator,
  DownloadsPage,
  MotdGenerator,
  ServerOptimizer,
  ServerStatus,
  SoundGenerator,
  TablistGenerator,
} from "./pages/Toolkit";
import { GuidesPage, PluginsPage } from "./pages/Professional";
import { PresetsPage } from "./pages/Presets";
function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/color-generator" component={ColorGenerator} />
      <Route path="/sound-generator" component={SoundGenerator} />
      <Route path="/motd-generator" component={MotdGenerator} />
      <Route path="/server-status" component={ServerStatus} />
      <Route path="/tablist-generator" component={TablistGenerator} />
      <Route path="/server-optimizer" component={ServerOptimizer} />
      <Route path="/downloads" component={DownloadsPage} />
      <Route path="/plugins" component={PluginsPage} />
      <Route path="/guides" component={GuidesPage} />
      <Route path="/presets" component={PresetsPage} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark" switchable>
        <TooltipProvider>
          <Toaster theme="dark" position="bottom-right" richColors />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
